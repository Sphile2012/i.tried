import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MessagesService } from './messages.service';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // Get all conversations for current user
  @Get('conversations')
  async getConversations(@Request() req: any) {
    return this.messagesService.getConversations(req.user.id);
  }

  // Get messages with a specific friend
  @Get(':friendId')
  async getMessages(@Request() req: any, @Param('friendId') friendId: string) {
    return this.messagesService.getMessages(req.user.id, friendId);
  }

  // Send a message
  @Post('send')
  async sendMessage(
    @Request() req: any,
    @Body() body: { receiverId: string; content: string },
  ) {
    return this.messagesService.sendMessage(
      req.user.id,
      body.receiverId,
      body.content,
    );
  }

  // Mark messages as read
  @Post('read/:friendId')
  async markAsRead(@Request() req: any, @Param('friendId') friendId: string) {
    return this.messagesService.markAsRead(req.user.id, friendId);
  }
}
