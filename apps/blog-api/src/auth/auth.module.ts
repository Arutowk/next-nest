import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[JwtModule.registerAsync({
    imports:[ConfigModule],
    useFactory:async (configService:ConfigService)=>({
      secret:configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: configService.get<string>('JWT_EXPRIES_IN'),
      },
    }),
    inject:[ConfigService]
  })],
  providers: [AuthResolver, AuthService,PrismaService],
})
export class AuthModule {}
