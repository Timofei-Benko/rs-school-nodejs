import { Controller, Body, Param, HttpStatus, UseGuards, Get, Post, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/task.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('boards')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':boardId/tasks')
  create(@Param('boardId') boardId: string, @Body() task: TaskDto) {
    return this.tasksService.create({ ...task, boardId });
  }

  @Get(':boardId/tasks')
  findAll(@Param('boardId') boardId: string) {
    return this.tasksService.findAll(boardId);
  }

  @Get(':boardId/tasks/:id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Put(':boardId/tasks/:id')
  update(
    @Param('id') id: string,
    @Param('boardId') boardId: string,
    @Body() task: TaskDto,
  ) {
    return this.tasksService.update(boardId, id, task);
  }

  @Delete(':boardId/tasks/:id')
  async remove(@Param('id') id: string, @Param('boardId') boardId: string) {
    await this.tasksService.remove(boardId, id);
    return HttpStatus.OK;
  }
}
