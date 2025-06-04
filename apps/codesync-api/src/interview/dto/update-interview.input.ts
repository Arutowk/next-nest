import { CreateInterviewInput } from './create-interview.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInterviewInput extends PartialType(CreateInterviewInput) {
  @Field(() => Int)
  id: number;
}
