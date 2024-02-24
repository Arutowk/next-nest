import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoStatus } from './entities/todo.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
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
