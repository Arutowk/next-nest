import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
export enum UserRole {
  INTERVIEWER = 'INTERVIEWER',
  CANDIDATE = 'CANDIDATE',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
export class UserInfo {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  image?: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
