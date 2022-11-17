import { Injectable } from '@nestjs/common';
import { Class } from 'src/graphql';
import { pool } from 'src/module/mariadb';

@Injectable()
export class UserService {
  async getUserbyKey(key: number) {
    const sql =
      'SELECT `userKey` as `key`, `userName`, `id` as `userId`, `passwd` as `userPassword`, `classKey` FROM User WHERE `userKey`=?';
    const result = await pool.query(sql, [key]);
    console.log('result', result);
    return result[0];
  }

  async getUserClass({ classKey }: { classKey: number }) {
    const sql =
      'SELECT `classKey` as `key`, `classContent` as `name` FROM `Class` WHERE `classKey`=?';
    const result: Class[] = await pool.query(sql, [classKey]);
    return result[0];
  }
}
