import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto';
import { LocalGuard } from './guard/local.guard';
import { JwtAuthGuard } from './guard/jwt.guard';
import { SkipJwtAuth } from './constant';

@ApiTags('登录验证')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @Post('login')
  @SkipJwtAuth()
  @UseGuards(LocalGuard)
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  //测试jwt状态，api需要jwt验证就加上 @UseGuards(JwtAuthGuard)
  @Get('status')
  @UseGuards(JwtAuthGuard)
  async status(@Req() req: Request) {
    return req.user;
  }
}

//Header=> Authorization : Bearer jwtcode
