import {
  IsDefined,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { CommentInfo } from './graphql';

type Nullable<T> = T | null;

export class CommentInfoInput extends CommentInfo {
  @IsDefined()
  @IsString()
  body: string;

  @IsInt()
  @IsPositive()
  userKey: number;

  @IsInt()
  @IsPositive()
  postKey: number;

  @IsOptional()
  @IsInt()
  parentCommentKey?: Nullable<number>;
}
