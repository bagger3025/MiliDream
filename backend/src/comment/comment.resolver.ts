import {
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Args,
  Query,
  Int,
} from '@nestjs/graphql';
import { Comment } from 'src/graphql';
import { UserService } from 'src/user/user.service';
import { CommentService } from './comment.service';
import { CommentInfoInput } from 'src/graphql-extended';

@Resolver('Comment')
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
  ) {}

  @Query('comment')
  getComment(@Args('key', { type: () => Int }) key: number) {
    return this.commentService.getCommentByKey(key);
  }

  @ResolveField('childComment')
  getChildComments(@Parent() comment: Comment) {
    return this.commentService.getChildComments(comment);
  }

  @ResolveField('commentUser')
  getCommentUser(@Parent() comment: Comment) {
    return this.userService.getUserbyKey(comment.userKey);
  }

  @Mutation('postComment')
  postComment(
    @Args('commentInfo', { type: () => CommentInfoInput })
    commentInfo: CommentInfoInput,
  ) {
    console.log('HELLO!', commentInfo);
    return this.commentService.postComment(commentInfo);
  }

  @Mutation('deleteComment')
  deleteComment(@Args('key') key: number) {
    console.log('deleteComment', key);
    return this.commentService.deleteComment(key);
  }
}
