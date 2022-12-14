import { Injectable } from '@nestjs/common';
import { BoardInfo } from 'src/graphql';
import { pool, postResult } from 'src/module/mariadb';

@Injectable()
export class PostService {
  async getAllPosts() {
    const sql =
      'SELECT `postKey` as `key`, `userKey`, `postTime` as `time`, `title`, `body`, `categoryKey`, `viewCount` FROM `Post`';
    const result = await pool.query(sql);
    console.log(result);

    return result;
  }

  async getPost(key: number) {
    const sql =
      'SELECT `postKey` as `key`, `userKey`, `postTime` as `time`, `title`, `body`, `categoryKey`, `viewCount` FROM `Post` WHERE `postKey`=?';
    const result = await pool.query(sql, [key]);

    if (result.length === 1) return result[0];
    else return null;
  }

  async postBoard(boardInfo: BoardInfo) {
    const sql =
      'INSERT INTO `Post` (`userKey`, `title`, `body`, `categoryKey`) VALUES (?, ?, ?, ?);';
    const result: postResult = await pool.query(sql, [
      boardInfo.userKey,
      boardInfo.title,
      boardInfo.body,
      boardInfo.categoryKey,
    ]);

    return result.affectedRows === 1;
  }

  async deleteBoard(key: number) {
    const sql = 'DELETE FROM `Post` WHERE `key`=?';
    const result: postResult = await pool.query(sql, [key]);

    return result.affectedRows === 1;
  }
}
