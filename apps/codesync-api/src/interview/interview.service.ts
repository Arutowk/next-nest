import { Injectable } from '@nestjs/common';
import { CreateInterviewInput } from './dto/create-interview.input';
import { UpdateInterviewInput } from './dto/update-interview.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InterviewService {
  constructor(private prisma: PrismaService) {}

  findByUser(id: string) {
    return this.prisma.interview.findMany({
      where: { id: id },
    });
  }
  create(createInterviewInput: CreateInterviewInput) {
    return 'This action adds a new interview';
  }

  findAll() {
    return `This action returns all interview`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interview`;
  }

  update(id: number, updateInterviewInput: UpdateInterviewInput) {
    return `This action updates a #${id} interview`;
  }

  remove(id: number) {
    return `This action removes a #${id} interview`;
  }
}
