import { Injectable } from '@nestjs/common';
import { Comment, CommentInfo, Post } from 'src/graphql';
import { pool, postResult } from 'src/module/mariadb';

@Injectable()
export class CommentService {
  async getComments({ key }: Post) {
    const sql =
      'SELECT `commentKey` as `key`, `userKey`, `body`, `postKey`, `commentTime` as `time`, `parentKey` FROM `Comment` WHERE `postKey`=? AND `parentKey` IS NULL;';
    const result: Comment[] = await pool.query(sql, [key]);
    return result;
  }

  async getChildComments({ key }: Comment) {
    const sql =
      'SELECT `commentKey` as `key`, `userKey`, `body`, `postKey`, `commentTime` as `time`, `parentKey` FROM `Comment` WHERE `parentKey`=?';
    const result: Comment[] = await pool.query(sql, [key]);
    return result;
  }

  async postComment(commentInfo: CommentInfo) {
    const sql =
      'INSERT INTO `Comment` (`userKey`, `body`, `postKey`, `parentKey`) VALUES (?, ?, ?, ?)';
    const result: postResult = await pool.query(sql, [
      commentInfo.userKey,
      commentInfo.body,
      commentInfo.postKey,
      commentInfo.parentCommentKey,
    ]);
    return result.affectedRows === 1;
  }

  async deleteComment(key: number) {
    const sql = 'DELETE FROM `Comment` WHERE `key`=?;';
    const result: postResult = await pool.query(sql, [key]);
    return result.affectedRows === 1;
  }
}
