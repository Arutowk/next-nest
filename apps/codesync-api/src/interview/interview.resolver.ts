import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { InterviewService } from './interview.service';
import { Interview } from './entities/interview.entity';
import { CreateInterviewInput } from './dto/create-interview.input';
import { UpdateInterviewInput } from './dto/update-interview.input';

@Resolver(() => Interview)
export class InterviewResolver {
  constructor(private readonly interviewService: InterviewService) {}

  @Mutation(() => Interview)
  createInterview(
    @Args('createInterviewInput') createInterviewInput: CreateInterviewInput,
  ) {
    return this.interviewService.create(createInterviewInput);
  }

  @Query(() => [Interview])
  getInterviewsById(@Args('id', { type: () => ID }) id: string) {
    return this.interviewService.findByUser(id);
  }

  @Query(() => Interview)
  getInterviewByStreamCallId(
    @Args('streamCallId', { type: () => String }) streamCallId: string,
  ) {
    return this.interviewService.findByStreamCallId(streamCallId);
  }

  @Mutation(() => Interview)
  updateInterview(
    @Args('updateInterviewInput') updateInterviewInput: UpdateInterviewInput,
  ) {
    return this.interviewService.update(
      updateInterviewInput.id,
      updateInterviewInput,
    );
  }
}
