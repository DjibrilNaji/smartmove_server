const express = require("express");
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    database: "smartmove",
    password: "",
  },
});
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3030;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}. Ready to accept requests!`);
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

app.post("/requests", async (req, res) => {
  try {
    const { matricule, secretCode } = req.body;

    if (!matricule || !secretCode) {
      return res.status(400).json({ error: "Matricule and secretCode are required in the request body." });
    }

    const user = await knex("users")
      .where({ matricule, secretCode })
      .first();

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const request = await knex("requests")
      .where({ matricule });

    if (!request) {
      return res.status(404).json({ error: "Requests not found." });
    }

    res.status(200).json(request);
  } catch (error) {
    console.error("Error retrieving request:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
