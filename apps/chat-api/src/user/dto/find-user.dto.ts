import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindUserQueryDto {
  @ApiProperty({ description: '用户的名称', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ description: '用户的邮箱', required: false })
  @IsOptional()
  @IsString()
  name?: string;
}
