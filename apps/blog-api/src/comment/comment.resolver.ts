import { UseGuards } from "@nestjs/common";
import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";

import { JwtAuthGuard } from "../auth/guards/jwt-auth/jwt-auth.guard";
import { DEFAULT_PAGE_SIZE } from "../constants";

import { CommentService } from "./comment.service";
import { CreateCommentInput } from "./dto/create-comment.input";
import { Comment } from "./entities/comment.entity";

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}
  @Query(() => [Comment])
  getPostComments(
    @Args("postId", { type: () => Int! }) postId: number,
    @Args("take", {
      type: () => Int,
      nullable: true,
      defaultValue: DEFAULT_PAGE_SIZE,
    })
    take: number,
    @Args("skip", {
      type: () => Int,
      nullable: true,
      defaultValue: 0,
    })
    skip: number,
  ) {
    return this.commentService.findOneByPost({ postId, take, skip });
  }

  @Query(() => Int)
  postCommentCount(@Args("postId", { type: () => Int! }) postId: number) {
    return this.commentService.count(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Comment)
  createComment(
    @Context() Context: GqlContext,
    @Args("createCommentInput") createCommentInput: CreateCommentInput,
  ) {
    const authorId = Context.req.user.id;
    return this.commentService.create(createCommentInput, authorId);
  }
}
