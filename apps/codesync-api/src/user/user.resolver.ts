import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInfo } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { User } from '@repo/db-codesync';

@Resolver(() => UserInfo)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserInfo)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.create(createUserInput);
  }

  @Query(() => UserInfo)
  async getUserById(
    @Args('id', { type: () => ID! }) id: string,
  ): Promise<User> {
    return this.userService.findOneId(id);
  }

  @Query(() => UserInfo)
  async getUserByEmail(
    @Args('email', { type: () => String! }) email: string,
  ): Promise<User> {
    return this.userService.findOneEmail(email);
  }
}
