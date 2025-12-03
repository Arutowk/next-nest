import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { MsgModule } from './msg/msg.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, MsgModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
