import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    const req = ctx.getRequest();
    const { method, protocol, originalUrl: url } = req;
    const query = JSON.stringify(req.query);
    let body = '';
    if (req.body) {
      body = JSON.stringify(
        req.body.password ? { ...req.body, password: '******' } : req.body,
      );
    }
    let status: number;
    let message = '';
    if (exception instanceof HttpException) {
      message = exception.message;
      status = exception.getStatus();
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    Logger.error(
      `${protocol} | ${status} | [${method}] | ${req.ip} | ${url}
          query={${query}}
          body={${body}}`,
    );
    if (process.env.USE_FASTIFY === 'true') {
      res.status(status).send(exception);
    } else {
      res.status(status).json({
        statusCode: status,
        message: message,
        timestamp: new Date().toISOString(),
        path: req.url,
      });
    }

    if (exception instanceof Error && !(exception instanceof HttpException)) {
      Logger.error(`message: ${exception.message}
      stack trace: ${exception.stack}`);
    }
  }
}
