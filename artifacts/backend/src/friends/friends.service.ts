import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaService) {}

  // Format last seen timestamp
  private formatLastSeen(lastSeenAt: Date | null): string {
    if (!lastSeenAt) return 'Never';

    const now = Date.now();
    const diff = now - lastSeenAt.getTime();

    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;

    return lastSeenAt.toLocaleDateString();
  }

  // Check if user is online (active within last 5 minutes)
  private isUserOnline(lastSeenAt: Date | null): boolean {
    if (!lastSeenAt) return false;
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return lastSeenAt > fiveMinutesAgo;
  }

  // Get all friends for a user
  async getFriends(userId: string) {
    // Get friendships where user is either user1 or user2
    const friendships = await this.prisma.friendship.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: {
        user1: {
          select: {
            id: true,
            username: true,
            displayName: true,
            proficiencyLevel: true,
            totalXp: true,
            lastSeenAt: true,
            isOnline: true,
            avatar: true,
          },
        },
        user2: {
          select: {
            id: true,
            username: true,
            displayName: true,
            proficiencyLevel: true,
            totalXp: true,
            lastSeenAt: true,
            isOnline: true,
            avatar: true,
          },
        },
      },
    });

    // Map to get the friend (not the current user)
    const friends = friendships.map((friendship) => {
      const friend = friendship.user1Id === userId ? friendship.user2 : friendship.user1;
      return {
        id: friend.id,
        username: friend.username,
        displayName: friend.displayName,
        level: friend.proficiencyLevel,
        xp: friend.totalXp,
        online: this.isUserOnline(friend.lastSeenAt),
        lastSeen: this.formatLastSeen(friend.lastSeenAt),
        avatar: friend.avatar,
      };
    });

    // Get pending requests (sent by current user)
    const pendingRequests = await this.prisma.friendRequest.findMany({
      where: {
        senderId: userId,
        status: 'PENDING',
      },
      include: {
        receiver: {
          select: {
            id: true,
            username: true,
            displayName: true,
            proficiencyLevel: true,
            totalXp: true,
            avatar: true,
          },
        },
      },
    });

    const pending = pendingRequests.map((req) => ({
      id: req.id,
      username: req.receiver.username,
      displayName: req.receiver.displayName,
      level: req.receiver.proficiencyLevel,
      xp: req.receiver.totalXp,
      avatar: req.receiver.avatar,
    }));

    // Get received requests (sent to current user)
    const receivedRequests = await this.prisma.friendRequest.findMany({
      where: {
        receiverId: userId,
        status: 'PENDING',
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            displayName: true,
            proficiencyLevel: true,
            totalXp: true,
            avatar: true,
          },
        },
      },
    });

    const received = receivedRequests.map((req) => ({
      id: req.id,
      username: req.sender.username,
      displayName: req.sender.displayName,
      level: req.sender.proficiencyLevel,
      xp: req.sender.totalXp,
      avatar: req.sender.avatar,
    }));

    return { friends, pending, received };
  }

  // Search users by username
  async searchUsers(query: string, currentUserId: string) {
    const users = await this.prisma.user.findMany({
      where: {
        AND: [
          {
            OR: [
              { username: { contains: query } },
              { displayName: { contains: query } },
            ],
          },
          { id: { not: currentUserId } }, // Exclude current user
        ],
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        proficiencyLevel: true,
        totalXp: true,
        avatar: true,
      },
      take: 20, // Limit results
    });

    return { users };
  }

  // Get user profile by username
  async getUserProfile(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        displayName: true,
        proficiencyLevel: true,
        totalXp: true,
        bio: true,
        avatar: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // Send friend request
  async sendFriendRequest(senderId: string, targetUserId: string) {
    // Validation
    if (senderId === targetUserId) {
      throw new BadRequestException('Cannot send friend request to yourself');
    }

    // Check if target user exists
    const targetUser = await this.prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      throw new NotFoundException('Target user not found');
    }

    // Check if already friends
    const existingFriendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { user1Id: senderId, user2Id: targetUserId },
          { user1Id: targetUserId, user2Id: senderId },
        ],
      },
    });

    if (existingFriendship) {
      throw new BadRequestException('Already friends with this user');
    }

    // Check if request already exists
    const existingRequest = await this.prisma.friendRequest.findFirst({
      where: {
        OR: [
          { senderId, receiverId: targetUserId },
          { senderId: targetUserId, receiverId: senderId },
        ],
        status: 'PENDING',
      },
    });

    if (existingRequest) {
      throw new BadRequestException('Friend request already exists');
    }

    // Create friend request
    const request = await this.prisma.friendRequest.create({
      data: {
        senderId,
        receiverId: targetUserId,
        status: 'PENDING',
      },
    });

    return { success: true, message: 'Friend request sent', requestId: request.id };
  }

  // Accept friend request
  async acceptFriendRequest(requestId: string, userId: string) {
    const request = await this.prisma.friendRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException('Friend request not found');
    }

    if (request.receiverId !== userId) {
      throw new BadRequestException('Not authorized to accept this request');
    }

    if (request.status !== 'PENDING') {
      throw new BadRequestException('Request is not pending');
    }

    // Create friendship and update request status in a transaction
    await this.prisma.$transaction([
      this.prisma.friendship.create({
        data: {
          user1Id: request.senderId,
          user2Id: request.receiverId,
        },
      }),
      this.prisma.friendRequest.update({
        where: { id: requestId },
        data: { status: 'ACCEPTED' },
      }),
    ]);

    return { success: true, message: 'Friend request accepted' };
  }

  // Reject friend request
  async rejectFriendRequest(requestId: string, userId: string) {
    const request = await this.prisma.friendRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException('Friend request not found');
    }

    if (request.receiverId !== userId) {
      throw new BadRequestException('Not authorized to reject this request');
    }

    if (request.status !== 'PENDING') {
      throw new BadRequestException('Request is not pending');
    }

    await this.prisma.friendRequest.update({
      where: { id: requestId },
      data: { status: 'REJECTED' },
    });

    return { success: true, message: 'Friend request rejected' };
  }

  // Remove friend
  async removeFriend(friendId: string, userId: string) {
    const friendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { user1Id: userId, user2Id: friendId },
          { user1Id: friendId, user2Id: userId },
        ],
      },
    });

    if (!friendship) {
      throw new NotFoundException('Friendship not found');
    }

    await this.prisma.friendship.delete({
      where: { id: friendship.id },
    });

    return { success: true, message: 'Friend removed' };
  }

  // Update user's online status and last seen
  async updateOnlineStatus(userId: string, isOnline: boolean) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        isOnline,
        lastSeenAt: new Date(),
      },
    });
  }
}
