import { Module } from '@nestjs/common';
import { FriendService } from 'src/friend/friend.service';
import { PrismaService } from '../prisma/prisma.service';
import { MsgController } from './msg.controller';
import { MsgGateway } from './msg.gateway';
import { MsgService } from './msg.service';

@Module({
  controllers: [MsgController],
  providers: [MsgGateway, MsgService, PrismaService, FriendService],
})
export class MsgModule {}
