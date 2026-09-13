import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  // Get all conversations for a user
  async getConversations(userId: string) {
    // Get all friends
    const friendships = await this.prisma.friendship.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: {
        user1: { select: { id: true, username: true, name: true } },
        user2: { select: { id: true, username: true, name: true } },
      },
    });

    // For each friend, get the last message and unread count
    const conversations = await Promise.all(
      friendships.map(async (friendship) => {
        const friendId = friendship.user1Id === userId ? friendship.user2Id : friendship.user1Id;
        const friend = friendship.user1Id === userId ? friendship.user2 : friendship.user1;

        // Get last message
        const lastMessage = await this.prisma.message.findFirst({
          where: {
            OR: [
              { senderId: userId, receiverId: friendId },
              { senderId: friendId, receiverId: userId },
            ],
          },
          orderBy: { createdAt: 'desc' },
        });

        // Get unread count
        const unreadCount = await this.prisma.message.count({
          where: {
            senderId: friendId,
            receiverId: userId,
            read: false,
          },
        });

        return {
          friendId: friend.id,
          friendUsername: friend.username,
          friendDisplayName: friend.name,
          lastMessage: lastMessage?.content || null,
          lastMessageTime: lastMessage?.createdAt || null,
          unreadCount,
          online: false, // TODO: Implement online status
        };
      }),
    );

    // Sort by last message time
    conversations.sort((a, b) => {
      if (!a.lastMessageTime) return 1;
      if (!b.lastMessageTime) return -1;
      return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime();
    });

    return { conversations };
  }

  // Get messages between two users
  async getMessages(userId: string, friendId: string) {
    // Verify they are friends
    const areFriends = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { user1Id: userId, user2Id: friendId },
          { user1Id: friendId, user2Id: userId },
        ],
      },
    });

    if (!areFriends) {
      throw new BadRequestException('You can only message friends');
    }

    const messages = await this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: friendId },
          { senderId: friendId, receiverId: userId },
        ],
      },
      orderBy: { createdAt: 'asc' },
    });

    return { messages };
  }

  // Send a message
  async sendMessage(senderId: string, receiverId: string, content: string) {
    if (!content || content.trim().length === 0) {
      throw new BadRequestException('Message content cannot be empty');
    }

    if (content.length > 2000) {
      throw new BadRequestException('Message is too long (max 2000 characters)');
    }

    // Verify they are friends
    const areFriends = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { user1Id: senderId, user2Id: receiverId },
          { user1Id: receiverId, user2Id: senderId },
        ],
      },
    });

    if (!areFriends) {
      throw new BadRequestException('You can only message friends');
    }

    const message = await this.prisma.message.create({
      data: {
        senderId,
        receiverId,
        content: content.trim(),
        read: false,
      },
    });

    return { success: true, message };
  }

  // Mark messages as read
  async markAsRead(userId: string, friendId: string) {
    await this.prisma.message.updateMany({
      where: {
        senderId: friendId,
        receiverId: userId,
        read: false,
      },
      data: {
        read: true,
      },
    });

    return { success: true };
  }
}
