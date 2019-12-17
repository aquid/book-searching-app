// require('dotenv').config({
//   debug: process.env.DEBUG
// });

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
    migrationStorageTableSchema: 'migration',
    migrationStorageTableName: 'BookSearchAppMeta',
    pool: {
      max: 15,
      min: 0,
      idle: 10000,
    },
    logging: false,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    migrationStorageTableSchema: 'migration',
    migrationStorageTableName: 'BookSearchAppMeta',
    pool: {
      max: 15,
      min: 0,
      idle: 10000,
    },
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
    migrationStorageTableSchema: 'migration',
    migrationStorageTableName: 'BookSearchAppMeta',
    pool: {
      max: 20,
      min: 0,
      idle: 10000,
    },
    logging: false,
  },
};
