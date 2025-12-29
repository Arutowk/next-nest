import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { CreateUserInput } from "./dto/create-user.input";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }
}
