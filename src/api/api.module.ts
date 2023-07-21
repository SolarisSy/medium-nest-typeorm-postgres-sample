import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoomsModule } from './rooms/rooms.module';
import { RequestsModule } from './requests/requests.module';
@Module({
  imports: [UserModule, RoomsModule, RequestsModule],
})
export class ApiModule {}
