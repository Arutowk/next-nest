import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({ description: '消息内容', example: '你好，服务器！' })
  content: string;

  @ApiProperty({ description: '接收者ID', example: 'user-123' })
  userId: string;

  @ApiProperty({ description: '房间ID', example: 'room-123' })
  roomId: string;
}
