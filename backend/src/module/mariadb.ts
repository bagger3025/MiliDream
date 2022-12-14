import * as mariadb from 'mariadb';
import * as dotenv from 'dotenv';
dotenv.config();

export const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  database: process.env.DB_DBNAME,
  connectionLimit: 5,
});

export type postResult = {
  affectedRows: number;
  insertId: number;
  warningStatus: number;
};
