import { Injectable } from '@nestjs/common';
import { FriendshipStatus } from 'src/generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FriendService {
  constructor(private prisma: PrismaService) {}

  //好友列表
  async getFriendsList(userId: string) {
    const friends = await this.prisma.friendship.findMany({
      where: {
        userId,
        status: FriendshipStatus.ACCEPTED,
      },
      // 包含好友（targetId）的用户信息
      include: {
        target: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });
    return friends;
  }

  //好友申请
  async sendFriendRequest(senderId: string, receiverId: string) {
    if (senderId === receiverId) {
      throw new Error('Cannot send friend request to yourself.');
    }

    const existingRelation = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { userId: senderId, targetId: receiverId },
          { userId: receiverId, targetId: senderId },
        ],
      },
    });
    if (existingRelation) {
      // 检查具体状态并给出相应提示
      if (
        existingRelation.status === 'PENDING' &&
        existingRelation.userId === receiverId
      ) {
        // 如果已存在对方发来的待处理请求，则应直接提示用户“同意”而不是“发送”
        throw new Error(
          'You have a pending friend request from this user. Please accept or reject it.',
        );
      }
      // 其他情况，如已是好友或请求已存在
      throw new Error(
        `A relationship with this user already exists with status: ${existingRelation.status}`,
      );
    }

    // 创建好友申请记录
    const request = await this.prisma.friendship.create({
      data: {
        userId: senderId,
        targetId: receiverId,
        status: FriendshipStatus.PENDING,
      },
    });
    return request;
  }

  //同意申请
  async acceptFriendRequest(requesterId: string, acceptorId: string) {
    // 1. 检查是否存在待处理的请求 (requesterId -> acceptorId)
    const pendingRequest = await this.prisma.friendship.findUnique({
      where: {
        userId_targetId: {
          userId: requesterId,
          targetId: acceptorId,
        },
        status: FriendshipStatus.PENDING,
      },
    });

    if (!pendingRequest) {
      throw new Error('找不到待处理的好友申请');
    }

    // 使用事务确保双向关系同时建立
    const acceptedRelations = await this.prisma.$transaction([
      // A. 更新原记录 (Requester -> Acceptor) 为 ACCEPTED
      this.prisma.friendship.update({
        where: {
          userId_targetId: {
            userId: requesterId,
            targetId: acceptorId,
          },
        },
        data: {
          status: FriendshipStatus.ACCEPTED,
        },
      }),

      // B. 创建反向记录 (Acceptor -> Requester)
      this.prisma.friendship.create({
        data: {
          userId: acceptorId,
          targetId: requesterId,
          status: FriendshipStatus.ACCEPTED,
        },
      }),
    ]);
    return acceptedRelations;
  }

  //获取待处理的好友请求
  async getPendingFriendRequests(currentUserId: string) {
    // 使用 include 关联 User model，以便显示发起请求者的信息
    const pendingRequests = await this.prisma.friendship.findMany({
      where: {
        targetId: currentUserId, // 接收方是当前用户
        status: FriendshipStatus.PENDING,
      },
      include: {
        user: true, // 包含发起请求的用户信息 (User model)
      },
    });

    return pendingRequests;
  }

  //拒绝请求、取消请求或删除好友都可以通过删除或更新记录来实现。最简单且最彻底的方式是删除该关系记录。
  /**
   * @param {string} userAId - 关系中的一方 ID
   * @param {string} userBId - 关系中的另一方 ID
   * @returns {Promise<void>}
   */
  async removeFriendship(userAId: string, userBId: string): Promise<void> {
    // 查找正向或反向的记录
    const result = await this.prisma.friendship.deleteMany({
      where: {
        OR: [
          { userId: userAId, targetId: userBId },
          { userId: userBId, targetId: userAId },
        ],
        // 可以在此处添加状态限制，例如只允许删除 ACCEPTED 或 PENDING 的
      },
    });

    if (result.count === 0) {
      throw new Error('Friendship record not found or already deleted.');
    }
  }

  // 如果只是拒绝好友请求 (REJECTED)，则改为 update:
  async rejectFriendRequest(requestId: string, currentUserId: string) {
    await this.prisma.friendship.update({
      where: {
        id: requestId,
        targetId: currentUserId, // 确保只有接收方才能执行拒绝操作
        status: 'PENDING',
      },
      data: {
        status: 'REJECTED',
      },
    });
  }
}
