const { resolve } = require("node:path");
const { config } = require("dotenv");

config();

const knexfile = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  migrations: {
    directory: resolve("db/migrations"),
    stub: resolve("db/migration.stub"),
  },
  seeds: {
    directory: resolve("db/seeds"),
  },
};

module.exports = knexfile;
