import { Resolver, Query, Context } from '@nestjs/graphql';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Post], { name: 'posts' })
  async findAll(@Context() context) {
    const user=context.req.user
    return await this.postService.findAll();
  }

}
