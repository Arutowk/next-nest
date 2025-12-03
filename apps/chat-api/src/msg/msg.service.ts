import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MsgService {
  constructor(private prisma: PrismaService) {}

  async createMessage(userId: string, roomId: string, content: string) {
    return this.prisma.message.create({
      data: { content, userId, roomId },
      include: { user: true }, // 包含发送者信息
    });
  }

  async getMessagesByRoom(roomId: string) {
    return this.prisma.message.findMany({
      where: { roomId },
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });
  }
}
