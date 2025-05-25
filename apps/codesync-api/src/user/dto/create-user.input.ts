import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field()
  @MinLength(8)
  password: string;

  @Field()
  @IsEmail()
  email: string;
}
