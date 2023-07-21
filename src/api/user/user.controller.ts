import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { DeleteResult } from 'typeorm';
import { CreateRoomsDto } from '../rooms/create-rooms.dto';
import { CreateRequestsDto } from '../requests/create-requests.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.getUser(id);
  }

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.service.createUser(body);
  }

  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto): Promise<User> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.service.remove(id);
  }

  @Post(':id/rooms')
  async addRoomToUser(@Param('id', ParseIntPipe) id: number, @Body() createRoomDto: CreateRoomsDto): Promise<User> {
    const room = await this.service.createRoom(createRoomDto);
    return this.service.addRoomToUser(id, room);
  }

  @Post(':id/requests') // Use o nome do método correto "addRequestToUser"
  async addRequestToUser(@Param('id', ParseIntPipe) id: number, @Body() createRequestDto: CreateRequestsDto): Promise<User> {
    const request = await this.service.createRequest(createRequestDto);
    return this.service.addRequestToUser(id, request);
  }
}
