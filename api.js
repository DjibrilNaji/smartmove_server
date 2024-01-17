const client = require("./connection");
const express = require("express");

const app = express();

const port = 3030;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}. Ready to accept requests!`);
});

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL:", err.message);
    process.exit(1); // Exit the application if unable to connect to the database
  });

app.get("/users", (req, res) => {
  client.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).send("Internal Server Error");
      return;
    }

    res.send(result.rows);
  });
});

app.get("/request", (req, res) => {
  client.query("SELECT * FROM requests", (err, result) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).send("Internal Server Error");
      return;
    }

    res.send(result.rows);
  });
});
