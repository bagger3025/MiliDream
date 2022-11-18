import { Injectable } from '@nestjs/common';
import { Comment, Post } from 'src/graphql';
import { pool } from 'src/module/mariadb';

@Injectable()
export class CommentService {
  async getComments({ key }: Post) {
    const sql =
      'SELECT `commentKey` as `key`, `userKey`, `body`, `postKey`, `commentTime` as `time`, `parentKey` FROM Comment WHERE `postKey`=? AND `parentKey` IS NULL;';
    const result: Comment[] = await pool.query(sql, [key]);
    return result;
  }

  async getChildComments({ key }: Comment) {
    const sql =
      'SELECT `commentKey` as `key`, `userKey`, `body`, `postKey`, `commentTime` as `time`, `parentKey` FROM Comment WHERE `parentKey`=?';
    const result: Comment[] = await pool.query(sql, [key]);
    return result;
  }
}
