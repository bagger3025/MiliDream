import {
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Args,
} from '@nestjs/graphql';
import { Comment, CommentInfo } from 'src/graphql';
import { UserService } from 'src/user/user.service';
import { CommentService } from './comment.service';

@Resolver()
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
  ) {}

  @ResolveField('childComment')
  getChildComments(@Parent() comment: Comment) {
    return this.commentService.getChildComments(comment);
  }

  @ResolveField('commentUser')
  getCommentUser(@Parent() comment: Comment) {
    return this.userService.getUserbyKey(comment.userKey);
  }

  @Mutation('postComment')
  postComment(@Args('commentInfo') commentInfo: CommentInfo) {
    return this.commentService.postComment(commentInfo);
  }

  @Mutation('deleteComment')
  deleteComment(@Args('key') key: number) {
    return this.commentService.deleteComment(key);
  }
}
