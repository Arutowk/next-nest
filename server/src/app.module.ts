import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { baseConfig } from '../db/config';

@Module({
  imports: [TypeOrmModule.forRoot(baseConfig), TodoModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
