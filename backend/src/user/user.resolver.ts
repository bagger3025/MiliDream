import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('user')
  getUserbyKey(@Args('key') key: number) {
    return this.userService.getUserbyKey(key);
  }

  @ResolveField('class')
  getUserClass(@Parent() user) {
    return this.userService.getUserClass(user);
  }
}
