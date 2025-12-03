import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { MsgService } from './msg.service';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MsgGateway {
  @WebSocketServer() server: Server;

  constructor(private messageService: MsgService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    client: any,
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
  handleJoinRoom(client: any, roomId: string) {
    client.join(roomId);
    // 可以通知房间内其他用户
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: any, roomId: string) {
    client.leave(roomId);
  }
}
