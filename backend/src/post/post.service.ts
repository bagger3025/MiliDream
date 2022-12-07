import { Injectable } from '@nestjs/common';
import { pool } from 'src/module/mariadb';

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
}
