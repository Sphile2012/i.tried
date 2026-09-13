import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users/:userId/level')
  async getUserLevel(@Request() req: any, @Param('userId') userId: string) {
    const adminId = req.user.id;
    return await this.adminService.getUserLevelInfo(adminId, userId);
  }

  @Put('users/:userId/level')
  async updateUserLevel(
    @Request() req: any,
    @Param('userId') userId: string,
    @Body() body: { newLevel: string; reason: string },
  ) {
    const adminId = req.user.id;
    return await this.adminService.updateUserLevel(
      adminId,
      userId,
      body.newLevel as any,
      body.reason,
    );
  }

  @Get('statistics/levels')
  async getLevelStatistics(@Request() req: any) {
    const adminId = req.user.id;
    return await this.adminService.getLevelStatistics(adminId);
  }

  @Get('users/search')
  async searchUsers(@Request() req: any, @Query('q') query: string) {
    const adminId = req.user.id;
    return await this.adminService.searchUsers(adminId, query);
  }

  @Post('users/:userId/rollback')
  async rollbackProgression(
    @Request() req: any,
    @Param('userId') userId: string,
  ) {
    const adminId = req.user.id;
    return await this.adminService.rollbackProgression(adminId, userId);
  }
}
