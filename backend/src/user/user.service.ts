import { Injectable } from '@nestjs/common';
import { Class, UserInfo } from 'src/graphql';
import { pool, postResult } from 'src/module/mariadb';

@Injectable()
export class UserService {
  async getUserbyKey(key: number) {
    const sql =
      'SELECT `userKey` as `key`, `userName`, `id` as `userId`, `passwd` as `userPassword`, `classKey` FROM `User` WHERE `userKey`=?';
    const result = await pool.query(sql, [key]);
    return result[0];
  }

  async getUserClass({ classKey }: { classKey: number }) {
    const sql =
      'SELECT `classKey` as `key`, `classContent` as `name` FROM `Class` WHERE `classKey`=?';
    const result: Class[] = await pool.query(sql, [classKey]);
    return result[0];
  }

  async postUser(userInfo: UserInfo) {
    const sql =
      'INSERT INTO `User` (`userName`, `userId`, `userPasswd`, `classKey`) VALUES (?, ?, ?, ?)';
    const result: postResult = await pool.query(sql, [
      userInfo.userName,
      userInfo.userId,
      userInfo.userPassword,
      userInfo.userClassKey,
    ]);
    return result.affectedRows === 1;
  }

  async deleteUser(key: number) {
    const sql = 'DELETE FROM `User` WHERE `key`=?';
    const result: postResult = await pool.query(sql, [key]);
    return result.affectedRows === 1;
  }
}
