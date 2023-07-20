import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { User } from './user.entity';
import { Rooms } from '../rooms/rooms.entity';
import { UserService } from './user.service';
import { DeleteResult } from 'typeorm';
import { CreateRoomsDto } from '../rooms/create-rooms.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @Post(':id/rooms')
  async addRoomToUser(@Param('id', ParseIntPipe) id: number, @Body() createRoomDto: CreateRoomsDto): Promise<User> {
    const room = await this.service.createRoom(createRoomDto);
    return this.service.addRoomToUser(id, room);
  }

  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.getUser(id);
  }

  @Post()
  public createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.service.createUser(body);
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto): Promise<User> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.service.remove(id);
  }
}
