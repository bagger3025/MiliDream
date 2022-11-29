import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserResolver } from './user/user.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PostService } from './post/post.service';
import { PostResolver } from './post/post.resolver';
import { CategoryResolver } from './category/category.resolver';
import { CategoryService } from './category/category.service';
import { CommentResolver } from './comment/comment.resolver';
import { CommentService } from './comment/comment.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
  ],
  controllers: [],
  providers: [
    UserService,
    UserResolver,
    PostService,
    PostResolver,
    CategoryResolver,
    CategoryService,
    CommentResolver,
    CommentService,
  ],
})
export class AppModule {}
