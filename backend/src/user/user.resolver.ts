import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User, UserInfo } from 'src/graphql';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('user')
  getUserbyKey(@Args('key') key: number) {
    console.log("We've got userkey=", key);
    return this.userService.getUserbyKey(key);
  }

  @ResolveField('class')
  getUserClass(@Parent() user: User) {
    return this.userService.getUserClass(user);
  }

  @Mutation('postUser')
  postUser(@Args('userInfo') userInfo: UserInfo) {
    return this.userService.postUser(userInfo);
  }

  @Mutation('deleteUser')
  deleteUser(@Args('key') key: number) {
    console.log(typeof key);
    return this.userService.deleteUser(key);
  }
}
