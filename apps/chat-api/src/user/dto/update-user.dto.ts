import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: '用户的名称', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: '用户的邮箱', required: false })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: '邮箱是否已验证', required: false })
  @IsBoolean()
  @IsOptional()
  emailVerified?: boolean;

  @ApiProperty({
    description: '用户的头像 URL',
    required: false,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  image?: string | null;
}
