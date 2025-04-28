import { Resolver, Query } from '@nestjs/graphql';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { name: 'posts' })
  async findAll() {
    return await this.postService.findAll();
  }

}
