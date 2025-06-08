import { InputType, Field, ID } from '@nestjs/graphql';
import { InterviewStatus } from '../entities/interview.entity';

@InputType()
export class CreateInterviewInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  streamCallId: string;

  @Field()
  startTime: Date;

  @Field({ nullable: true })
  endTime?: Date;

  @Field(() => InterviewStatus, {
    defaultValue: InterviewStatus.SCHEDULED,
  })
  status?: InterviewStatus;

  @Field()
  interviewerId: string;

  @Field()
  candidateId: string;
}
