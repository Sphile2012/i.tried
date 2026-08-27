import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async getProfile(@Request() req: any) {
    return this.userService.findOne(req.user.userId);
  }

  @Get('progress')
  async getProgress(@Request() req: any) {
    return this.userService.getProgress(req.user.userId);
  }

  @Get('achievements')
  async getAchievements(@Request() req: any) {
    return this.userService.getAchievements(req.user.userId);
  }

  @Patch('profile')
  async updateProfile(@Request() req: any, @Body() body: any) {
    return this.userService.update(req.user.userId, body);
  }
}
