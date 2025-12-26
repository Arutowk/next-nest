import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import type {
  ClientToServerEvents,
  EventPayload,
  ServerToClientEvents,
} from '@repo/socket-types';
import { Server, Socket } from 'socket.io';
import { createAuth, getConfig } from 'src/auth';
import { FriendService } from 'src/friend/friend.service';
import { MessageResponseDto } from './dto/message-response.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { MsgService } from './msg.service';

const LOBBY_ROOM = 'lobby';

type SocketType = Socket<ClientToServerEvents, ServerToClientEvents>;

@ApiTags('WebSocket: Chat Events')
@WebSocketGateway(8888, {
  transports: ['websocket'],
  cors: {
    origin: 'http://localhost:3000', // 前端地址
    credentials: true,
  },
})
export class MsgGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server<ClientToServerEvents, ServerToClientEvents>;

  constructor(
    private messageService: MsgService,
    private friendService: FriendService,
  ) {}

  async handleConnection(client: SocketType) {
    console.log(client.id + '--join');
    client.join(LOBBY_ROOM);
    const socketHeaders = new Headers(client.handshake.headers as HeadersInit);
    const auth = createAuth(getConfig());
    const session = await auth.api.getSession({
      headers: socketHeaders,
    });
    const userId = session?.user.id!;
    const friends = await this.friendService.getFriendsIds(userId);
    friends.forEach((friendId) => {
      const roomId = [userId, friendId].sort().join('_');
      client.join(roomId);
      console.log('join_room:', roomId);
    });
  }

  handleDisconnect(client: SocketType) {
    console.log(client.id + 'leave');
  }

  @SubscribeMessage('send_direct_message')
  @ApiOperation({
    summary: '发送聊天消息到服务器',
    description: '客户端调用此事件发送消息给特定用户。',
  })
  // 描述期望接收的请求体结构
  @ApiBody({ type: SendMessageDto, description: '要发送的消息内容和目标ID' })
  // 描述服务器可能返回的响应（直接响应或广播）
  @ApiResponse({
    status: 200,
    type: MessageResponseDto,
    description: '服务器收到消息后返回的确认或广播的消息结构',
  })
  async handlePrivateMessage(
    client: SocketType,
    payload: EventPayload<ClientToServerEvents, 'send_direct_message'>,
  ) {
    // 1. 获取/创建房间
    const room = await this.messageService.getOrCreateRoom(
      payload.userId,
      payload.targetId,
    );
    // 2. 保存消息到数据库
    const newMessage = await this.messageService.createMessage(
      payload.userId,
      room.id,
      payload.content,
    );
    // 3. 向该房间内 所有客户端广播这条新消息
    this.server.to(room.name).emit('new_message', newMessage);
  }

  @SubscribeMessage('join_room')
  handleJoinRoom(client: Socket, roomId: string) {
    client.join(roomId);
    // 可以通知房间内其他用户
  }

  @SubscribeMessage('leave_room')
  handleLeaveRoom(client: Socket, roomId: string) {
    client.leave(roomId);
  }
}
