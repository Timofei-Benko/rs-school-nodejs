import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Task } from '../tasks/entities/task.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  async create(user: UserDto): Promise<User> {
    const existUser = await this.getByLogin(user.login);
    if (existUser) {
      throw new HttpException(
        `Error: user already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.password, salt);
    const createdUser = this.usersRepository.create({ ...user, password });
    const savedUser = this.usersRepository.save(createdUser);
    if (typeof savedUser === 'undefined') {
      throw new HttpException(
        `Error: unable to create user`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return savedUser;
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (typeof user === 'undefined') {
      throw new HttpException(
        `Error: user not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async update(id: string, user: UserDto) {
    const res = await this.usersRepository.findOne(id);
    if (typeof res === 'undefined') {
      throw new HttpException(
        `Error: user not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const updatedUser = await this.usersRepository.update(id, user);
    return updatedUser.raw;
  }

  async remove(id: string) {
    await this.tasksRepository.update({ userId: id }, { userId: undefined });
    const removeSuccess = await this.usersRepository.delete(id);
    if (!removeSuccess.affected) {
      throw new HttpException(
        `Error: user not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return true;
  }
  async getByLogin(login: string) {
    return this.usersRepository.findOne({ login });
  }
}
