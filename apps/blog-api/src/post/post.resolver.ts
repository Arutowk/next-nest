import { UseGuards } from "@nestjs/common";
import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "../auth/guards/jwt-auth/jwt-auth.guard";
import { DEFAULT_PAGE_SIZE } from "../constants";
import { CreatePostInput } from "./dto/create-post.input";
import { UpdatePostInput } from "./dto/update-post.input";
import { Post } from "./entities/post.entity";
import { PostService } from "./post.service";

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  // @UseGuards(JwtAuthGuard)
  @Query(() => [Post], { name: "posts" })
  async findAll(
    @Context() context: GqlContext,
    @Args("skip", { nullable: true }) skip?: number,
    @Args("take", { nullable: true }) take?: number,
  ) {
    const user = context.req.user;
    console.log({ user });

    return this.postService.findAll({ skip, take });
  }

  @Query(() => Int, { name: "postCount" })
  count() {
    return this.postService.count();
  }

  @Query(() => Post)
  getPostById(@Args("id", { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Post])
  getUserPosts(
    @Context() context: GqlContext,
    @Args("skip", { nullable: true, type: () => Int }) skip?: number,
    @Args("take", { nullable: true, type: () => Int }) take?: number,
  ) {
    const userId = context.req.user.id;
    return this.postService.findByUser({
      userId,
      skip: skip ?? 0,
      take: take ?? DEFAULT_PAGE_SIZE,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Int)
  userPostCount(@Context() context: GqlContext) {
    const userId = context.req.user.id;
    return this.postService.userPostCount(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  createPost(
    @Context() context: GqlContext,
    @Args("createPostInput") createPostInput: CreatePostInput,
  ) {
    const authorId = context.req.user.id;
    console.log(createPostInput);
    return this.postService.create({ createPostInput, authorId });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  updatePost(
    @Context() context: GqlContext,

    @Args("updatePostInput") updatePostInput: UpdatePostInput,
  ) {
    const userId = context.req.user.id;
    return this.postService.update({ userId, updatePostInput });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  deletePost(
    @Context() context: GqlContext,
    @Args("postId", { type: () => Int }) postId: number,
  ) {
    const userId = context.req.user.id;
    return this.postService.delete({ postId, userId });
  }
}
