import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { FindUserQueryDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id') // 使用 PATCH 方法进行部分更新
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) // 启用 DTO 验证
  @ApiOperation({ summary: '更新指定 ID 的用户信息' })
  @ApiResponse({ status: HttpStatus.OK, description: '用户更新成功。' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: '用户不存在。' })
  async update(
    @Param('id') id: string, // 从 URL 路径中获取用户 ID
    @Body() updateUserData: UpdateUserDto, // 从请求体中获取更新数据
  ) {
    return this.userService.updateUser(id, updateUserData);
  }

  @Get('find')
  async findOneUser(@Query() query: FindUserQueryDto) {
    const user = await this.userService.findUser(query);
    return user;
  }
}
