import { Repository } from 'typeorm';

import { Todo } from '../../todo/entities/todo.entity';
import { CustomRepository } from '../typeorm-ex.decorator';

@CustomRepository(Todo)
export class TodoRepository extends Repository<Todo> {}
