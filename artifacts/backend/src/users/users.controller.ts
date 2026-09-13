import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FriendsService } from '../friends/friends.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    userId: string;
  };
}

@Controller('users')
export class UsersController {
  constructor(private friendsService: FriendsService) {}

  @Get('search')
  @UseGuards(JwtAuthGuard)
  async searchUsers(@Request() req: RequestWithUser, @Query('q') query: string) {
    return this.friendsService.searchUsers(query, req.user.userId);
  }

  @Get('profile/:username')
  async getUserProfile(@Param('username') username: string) {
    return this.friendsService.getUserProfile(username);
  }
}
