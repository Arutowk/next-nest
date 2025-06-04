import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewResolver } from './interview.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [InterviewResolver, InterviewService, PrismaService],
})
export class InterviewModule {}
