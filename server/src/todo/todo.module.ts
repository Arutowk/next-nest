import { Module } from '@nestjs/common';

import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { TodoRepository } from 'src/db/repositories/TodoRepository';
import { UserRepository } from 'src/db/repositories/UserRepository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([TodoRepository, UserRepository]),
    UserModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
