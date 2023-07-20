import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Rooms } from '../rooms/rooms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Rooms])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
