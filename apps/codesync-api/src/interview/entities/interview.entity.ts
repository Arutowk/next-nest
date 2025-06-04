import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum InterviewStatus {
  SCHEDULED = 'SCHEDULED', // 已安排
  IN_PROGRESS = 'IN_PROGRESS', // 进行中
  COMPLETED = 'COMPLETED', // 已完成
  CANCELLED = 'CANCELLED', // 已取消
}

registerEnumType(InterviewStatus, {
  name: 'InterviewStatus',
});

@ObjectType()
export class Interview {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => InterviewStatus)
  status: InterviewStatus;

  @Field(() => Date)
  startTime: Date;

  @Field(() => Date)
  endTime?: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field({ nullable: true })
  streamCallId?: string;
}
