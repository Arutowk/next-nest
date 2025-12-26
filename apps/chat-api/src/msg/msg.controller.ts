import { Controller, Get, Param } from '@nestjs/common';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { Session } from '@thallesp/nestjs-better-auth';
import { MsgService } from './msg.service';

@Controller('msg')
export class MsgController {
  constructor(private readonly msgService: MsgService) {}

  @Get('friend/:id')
  async RoomMessageList(
    @Session() session: UserSession,
    @Param('id') friendId: string,
  ) {
    const roomName = [session.user.id, friendId].sort().join('_');
    return this.msgService.getMessagesByRoom(roomName);
  }
}
