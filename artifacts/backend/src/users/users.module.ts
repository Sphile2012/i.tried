import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { FriendsModule } from '../friends/friends.module';

@Module({
  imports: [FriendsModule],
  controllers: [UsersController],
})
export class UsersModule {}
