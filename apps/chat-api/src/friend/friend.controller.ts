import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { Session } from '@thallesp/nestjs-better-auth';

import { FriendService } from './friend.service';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get()
  async friendsList(@Session() session: UserSession) {
    return this.friendService.getFriendsList(session.user.id);
  }

  @Get('addMeList')
  async addMeList(@Session() session: UserSession) {
    return this.friendService.getFriendRequests(session.user.id);
  }

  @Post('add/:id')
  async friendRequest(
    @Session() session: UserSession,
    @Param('id') id: string,
  ) {
    return this.friendService.sendFriendRequest(session.user.id, id);
  }

  @Patch('agree/:id')
  async agree(@Session() session: UserSession, @Param('id') requestId: string) {
    return this.friendService.acceptFriendRequest(requestId, session.user.id);
  }

  @Patch('refuse/:id')
  async refuse(
    @Session() session: UserSession,
    @Param('id') requestId: string,
  ) {
    return this.friendService.rejectFriendRequest(requestId, session.user.id);
  }
}
