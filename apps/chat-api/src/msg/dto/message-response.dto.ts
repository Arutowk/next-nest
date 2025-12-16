import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
  @ApiProperty({ description: '消息ID', example: 'msg-abc' })
  id: string;

  @ApiProperty({ description: '发送者ID', example: 'server' })
  senderId: string;

  @ApiProperty({ description: '消息内容', example: '收到你的消息了。' })
  content: string;

  @ApiProperty({ description: '发送时间' })
  timestamp: Date;
}
