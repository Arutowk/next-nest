import { Injectable } from '@nestjs/common';
import { CreateInterviewInput } from './dto/create-interview.input';
import { UpdateInterviewInput } from './dto/update-interview.input';
import { PrismaService } from '../prisma/prisma.service';
import { InterviewStatus } from './entities/interview.entity';

@Injectable()
export class InterviewService {
  constructor(private prisma: PrismaService) {}

  async create(createInterviewInput: CreateInterviewInput) {
    const { interviewerId, candidateId, ...rest } = createInterviewInput;
    const status = createInterviewInput.status || InterviewStatus.SCHEDULED;
    return await this.prisma.interview.create({
      data: {
        ...rest,
        status,
        interviewer: { connect: { id: interviewerId } },
        candidate: { connect: { id: candidateId } },
      },
      include: {
        interviewer: true,
        candidate: true,
      },
    });
  }

  async findByUser(id: string) {
    return await this.prisma.interview.findMany({
      where: {
        OR: [{ interviewer: { id: id } }, { candidate: { id: id } }],
      },
    });
  }

  async findByStreamCallId(streamCallId: string) {
    return await this.prisma.interview.findUnique({
      where: { streamCallId: streamCallId },
    });
  }

  async update(id: number, updateInterviewInput: UpdateInterviewInput) {
    return `This action updates a #${id} interview`;
  }
}
