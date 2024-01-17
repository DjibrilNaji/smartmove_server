const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  database: "smartmove",
  password: "Djibali78",
});

module.exports = client;
