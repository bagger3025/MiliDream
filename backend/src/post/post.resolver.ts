import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CategoryService } from 'src/category/category.service';
import { CommentService } from 'src/comment/comment.service';
import { Post } from 'src/graphql';
import { UserService } from 'src/user/user.service';
import { PostService } from './post.service';

@Resolver('Post')
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly commentService: CommentService,
  ) {}

  @Query('allPosts')
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Query('post')
  async getPost(@Args('key', { type: () => Int }) key: number) {
    return this.postService.getPost(key);
  }

  @ResolveField('postUser')
  async getPostUser(@Parent() post: Post) {
    return this.userService.getUserbyKey(post.userKey);
  }

  @ResolveField('comments')
  async getComments(@Parent() post: Post) {
    return this.commentService.getComments(post);
  }

  @ResolveField('category')
  async getCategory(@Parent() post: Post) {
    return this.categoryService.getCategorybyKey(post.categoryKey);
  }
}
