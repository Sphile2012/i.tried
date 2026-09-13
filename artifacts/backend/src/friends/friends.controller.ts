import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    userId: string;
  };
}

@Controller('friends')
@UseGuards(JwtAuthGuard)
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @Get()
  async getFriends(@Request() req: RequestWithUser) {
    return this.friendsService.getFriends(req.user.userId);
  }

  @Post('request')
  async sendFriendRequest(@Request() req: RequestWithUser, @Body() body: { targetUserId: string }) {
    return this.friendsService.sendFriendRequest(req.user.userId, body.targetUserId);
  }

  @Post('accept/:requestId')
  async acceptFriendRequest(@Request() req: RequestWithUser, @Param('requestId') requestId: string) {
    return this.friendsService.acceptFriendRequest(requestId, req.user.userId);
  }

  @Post('reject/:requestId')
  async rejectFriendRequest(@Request() req: RequestWithUser, @Param('requestId') requestId: string) {
    return this.friendsService.rejectFriendRequest(requestId, req.user.userId);
  }

  @Delete(':friendId')
  async removeFriend(@Request() req: RequestWithUser, @Param('friendId') friendId: string) {
    return this.friendsService.removeFriend(friendId, req.user.userId);
  }
}
