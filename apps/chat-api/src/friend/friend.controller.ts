import { Controller, Get, Param, Post } from '@nestjs/common';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { Session } from '@thallesp/nestjs-better-auth';

import { FriendService } from './friend.service';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post(':id')
  async friendRequest(@Session() session: UserSession, @Param() id: string) {
    return this.friendService.sendFriendRequest(session.user.id, id);
  }

  @Get()
  async friendsList(@Session() session: UserSession) {
    return this.friendService.getFriendsList(session.user.id);
  }
}
