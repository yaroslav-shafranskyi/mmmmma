import knex from 'knex';
import { DB_HOST, DB_NAME, DB_PASS, DB_USER } from '../config/config';

export const db = knex({
  client: 'pg',
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    charset: 'utf8',
  },
});
