import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MsgService } from './msg.service';
import { MsgGateway } from './msg.gateway';

@Module({
  providers: [MsgGateway, MsgService, PrismaService],
})
export class MsgModule {}
