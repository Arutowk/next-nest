import { User } from '../../src/user/entities/user.entity';
import { Todo } from '../../src/todo/entities/todo.entity';
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';

const ormConfig: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [User, Todo],
};

export default ormConfig;
