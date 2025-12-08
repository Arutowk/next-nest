import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { Server, Socket } from 'socket.io';
import { MsgService } from './msg.service';

@WebSocketGateway(3002, { cors: { origin: '*' } })
@UseGuards(AuthGuard)
export class MsgGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private messageService: MsgService) {}

  handleConnection(client: Socket) {
    console.log(client.id + 'join');
    client.broadcast.emit('user-joined', {
      message: `new user joined the chat ${client.id}`,
    });
  }

  handleDisconnect(client: Socket) {
    console.log(client.id + 'leave');
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    client: Socket,
    payload: { roomId: string; content: string; userId: string },
  ) {
    // 1. 将消息保存到数据库
    const newMessage = await this.messageService.createMessage(
      payload.userId,
      payload.roomId,
      payload.content,
    );
    // 2. 向该房间内所有客户端广播这条新消息
    this.server.to(payload.roomId).emit('newMessage', newMessage);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomId: string) {
    client.join(roomId);
    // 可以通知房间内其他用户
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, roomId: string) {
    client.leave(roomId);
  }
}
