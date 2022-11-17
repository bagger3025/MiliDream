import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { PostService } from './post.service';

@Resolver('Post')
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Query('allPosts')
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  @ResolveField('postUser')
  async getPostUser(@Parent() post) {
    console.log('post', post);
    return this.userService.getUserbyKey(post.userKey);
  }
}
