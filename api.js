const client = require("./connection");
const express = require("express");

const app = express();

app.listen(3030, () => {
  console.log("Server is listening on port 3000. Ready to accept requests!");
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
