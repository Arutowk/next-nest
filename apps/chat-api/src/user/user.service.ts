import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  /**
   * 根据可选的 email 和 name 查找用户列表
   * @param email 可选的 email
   * @param name 可选的 name
   * @returns 匹配的用户列表 (User[])
   */
  async findUser(params: Prisma.UserWhereInput): Promise<User | null> {
    console.log(params);
    const where: Partial<Prisma.UserWhereInput> = {};

    if (params.email) {
      where.email = params.email;
    }

    if (params.name) {
      where.name = {
        contains: params.name as string,
      };
    }

    const user = await this.prisma.user.findFirst({
      where: where,
    });
    console.log(user);
    return user;
  }

  async updateUser(id: string, updateUserData: UpdateUserDto): Promise<User> {
    // 1. 检查用户是否存在（可选但推荐）
    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException(`ID 为 ${id} 的用户不存在。`);
    }

    // 2. 执行更新操作
    const updatedUser = await this.prisma.user.update({
      where: { id }, // 匹配条件：根据 ID 查找用户
      data: {
        ...updateUserData,
        updatedAt: new Date(), // 手动更新时间戳
      },
    });

    return updatedUser;
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
