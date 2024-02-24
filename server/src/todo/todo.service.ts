import { Injectable } from '@nestjs/common';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoStatus } from './entities/todo.entity';
import { UserRepository } from 'src/db/repositories/UserRepository';
import { TodoRepository } from 'src/db/repositories/TodoRepository';

@Injectable()
export class TodoService {
  constructor(
    private todoRepository: TodoRepository,
    private userRepository: UserRepository,
  ) {}

  async create(userId: number, createTodoDto: CreateTodoDto): Promise<Todo> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const { title, description, media } = createTodoDto;

    const todo = new Todo();
    todo.title = title;
    todo.description = description;
    todo.status = createTodoDto.status || TodoStatus.TODO;
    todo.media = media;
    todo.author = user;

    return this.todoRepository.save(todo);
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne({ where: { id } });
  }

  async findAllByUserId(userId: number): Promise<Todo[]> {
    const user = await this.userRepository.findOne({
      relations: ['todos'],
      where: { id: userId },
    });

    return user ? user.todos : [];
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const { title, description, status, media } = updateTodoDto;

    return this.todoRepository.update(id, {
      title,
      description,
      status: status || TodoStatus.TODO,
      media: media || '',
    });
  }

  async remove(id: number) {
    return this.todoRepository.delete({
      id,
    });
  }
}
