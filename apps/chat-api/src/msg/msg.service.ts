import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MsgService {
  constructor(private prisma: PrismaService) {}

  async createMessage(userId: string, roomId: string, content: string) {
    return await this.prisma.message.create({
      data: { content, userId, roomId },
      include: { user: true }, // 包含发送者信息
    });
  }

  async getOrCreateRoom(userAId: string, userBId: string) {
    // 保持 ID 排序一致性，确保 A_B 和 B_A 指向同一个房间
    const roomName = [userAId, userBId].sort().join('_');

    return await this.prisma.room.upsert({
      where: { name: roomName },
      update: {},
      create: { name: roomName },
    });
  }

  async getMessagesByRoom(name: string) {
    const room = await this.prisma.room.findUnique({ where: { name } });
    if (!room) return [];
    else
      return await this.prisma.message.findMany({
        where: { roomId: room.id },
        include: { user: true },
        orderBy: { createdAt: 'asc' },
      });
  }
}
