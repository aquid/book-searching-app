/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const SequelizeAuto = require('sequelize-auto');
require('dotenv').config({
  debug: process.env.DEBUG,
});

const auto = new SequelizeAuto(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    port: process.env.DATABASE_PORT,
    config: './config/database',
    camel: true,
  },
);

auto.run((err) => {
  if (err) throw err;
  console.log(auto.tables); // table list
  console.log(auto.foreignKeys); // foreign key list
});
