import { Injectable } from '@nestjs/common';
import { pool } from 'src/module/mariadb';

@Injectable()
export class CategoryService {
  async getCategorybyKey(key: number) {
    const sql =
      'SELECT `categoryKey` as `key`, `categoryName` as `name` FROM `Category` WHERE `categoryKey`=?';
    const result = await pool.query(sql, [key]);
    return result[0];
  }
}
