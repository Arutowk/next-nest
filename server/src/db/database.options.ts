import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { Todo } from 'src/todo/entities/todo.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DatabaseOptions implements TypeOrmOptionsFactory {
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [User, Todo],
      //   synchronize: true,
      migrations: [
        /*...*/
      ],
      migrationsTableName: 'custom_migration_table',
    };
  }
}
