import { Controller, Body, Param, HttpStatus, UseGuards, Get, Post, Put, Delete } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';

import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { toResponse } from './entities/user.entity';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: UserDto) {
    const createdUser = await this.usersService.create(user);
    return toResponse(createdUser);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map(toResponse);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return toResponse(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userDto: UserDto) {
    const user = await this.usersService.update(id, userDto);
    return toResponse(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return HttpStatus.OK;
  }
}
