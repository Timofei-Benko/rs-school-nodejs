import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getRepository } from 'typeorm';
import { User } from './users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { Logger } from '@nestjs/common';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

const createAdmin = async () => {
  const admin = {
    name: 'admin',
    login: 'admin',
    password: 'admin',
  };

  const userRepository = getRepository(User);
  const doesAdminExist = !!await userRepository.findOne({ login: admin.login });

  if (!doesAdminExist) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(admin.password, salt);
    const createdUser = await userRepository.create({
      ...admin,
      password,
    });

    await userRepository.save(createdUser);
  }
};

const bootstrap = async () => {
  const fastify = process.env.USE_FASTIFY === 'true';
  const PORT = parseInt(process.env.PORT) || 4000;
  let app;
  if (fastify) {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
  } else {
    app = await NestFactory.create(AppModule);
  }
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  const swaggerDocument = yaml.load(
    readFileSync(join(__dirname, '../doc/api.yaml'), 'utf-8'),
  ) as OpenAPIObject;
  SwaggerModule.setup('/doc', app, swaggerDocument);
  if (fastify) {
    await app.listen(PORT, '0.0.0.0');
  } else {
    await app.listen(PORT);
  }
  await createAdmin();
  return PORT;
};

bootstrap().then((PORT: number) =>
  Logger.log(`App is running on http://localhost:${PORT}`),
);
