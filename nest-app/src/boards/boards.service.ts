import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { BoardDto } from './dto/board.dto';

import { Board } from './entities/board.entity';
import { Task } from '../tasks/entities/task.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  async create(board: BoardDto) {
    const createdBoard = await this.boardsRepository.create(board);
    const savedBoard = await this.boardsRepository.save(createdBoard);
    if (typeof savedBoard === 'undefined') {
      throw new HttpException(
        `Error: unable to create board`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return createdBoard;
  }

  async findAll() {
    return this.boardsRepository.find();
  }

  async findOne(id: string) {
    const board = await this.boardsRepository.findOne(id);
    if (typeof board === 'undefined') {
      throw new HttpException(
        `Error: board not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return board;
  }

  async update(id: string, board: BoardDto) {
    const res = await this.boardsRepository.findOne(id);
    if (typeof res === 'undefined') {
      throw new HttpException(
        `Error: board not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const updatedBoard = await this.boardsRepository.update(id, board);
    return updatedBoard.raw;
  }

  async remove(id: string) {
    await this.tasksRepository.delete({ boardId: id });
    const removeSuccess = await this.boardsRepository.delete(id);
    if (!removeSuccess.affected) {
      throw new HttpException(
        `Error: board not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return true;
  }
}
