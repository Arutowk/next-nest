import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { User as UserType } from '@repo/db-codesync';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserType> {
    return await this.userService.create(createUserInput);
  }

  @Query(() => User)
  async getUserById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<UserType> {
    return this.userService.findOne(id);
  }
}
