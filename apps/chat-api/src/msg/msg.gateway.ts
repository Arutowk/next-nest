import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageResponseDto } from './dto/message-response.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { MsgService } from './msg.service';

const LOBBY_ROOM = 'lobby';

@ApiTags('WebSocket: Chat Events')
@WebSocketGateway(8888, { namespace: 'socket.io', cors: { origin: '*' } })
export class MsgGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private messageService: MsgService) {}

  handleConnection(client: Socket) {
    console.log(client.id + '--join');
    client.join(LOBBY_ROOM);
    client.broadcast.emit('user-joined', {
      message: `new user joined the chat ${client.id}`,
    });
  }

  handleDisconnect(client: Socket) {
    console.log(client.id + 'leave');
  }

  @SubscribeMessage('newMessage')
  handleNewMessage(client: Socket, message: any) {
    console.log(message);
    client.emit('reply', 'nihao');
  }

  @SubscribeMessage('sendMessage')
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
