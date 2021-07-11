import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from '../login/login.module';

import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';

import { Board } from './entities/board.entity';
import { Task } from '../tasks/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Task]), LoginModule],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
