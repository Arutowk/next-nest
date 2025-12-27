import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@thallesp/nestjs-better-auth';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createAuth, SocialOptions } from './auth'; // Your Better Auth instance
import { FriendModule } from './friend/friend.module';
import { MsgModule } from './msg/msg.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const options: SocialOptions = {
          github: {
            clientId: configService.get<string>('GITHUB_CLIENT_ID')!,
            clientSecret: configService.get<string>('GITHUB_CLIENT_ID')!,
          },
          google: {
            clientId: configService.get<string>('GOOGLE_CLIENT_ID')!,
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET')!,
          },
        };
        return {
          auth: createAuth(options),
          disableGlobalAuthGuard: true,
        };
      },
      inject: [ConfigService],
    }),
    PrismaModule,
    UserModule,
    FriendModule,
    MsgModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
