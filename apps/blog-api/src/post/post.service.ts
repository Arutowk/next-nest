import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma:PrismaService){}

  async findAll() {
    return this.prisma.post.findMany();
  }

}
