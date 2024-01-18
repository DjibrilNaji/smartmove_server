const express = require("express");
const cors = require("cors");
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    database: "smartmove",
    password: "Djibali785",
  },
});
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3030;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}. Ready to accept requests!`);
});

app.post("/requests", async (req, res) => {
  try {
    const { matricule, secretCode } = req.body;

    if (!matricule || !secretCode) {
      return res.status(400).json({
        error: "Matricule and secretCode are required in the request body.",
      });
    }

    const user = await knex("users").where({ matricule, secretCode }).first();

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const request = await knex("requests").where({ matricule });

    if (!request) {
      return res.status(404).json({ error: "Requests not found." });
    }

    res.status(200).json(request);
  } catch (error) {
    console.error("Error retrieving request:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/request", async (req, res) => {
  try {
    const { matricule, price, motif, date } = req.body;

    if (!matricule || !price || !motif || !date) {
      return res.status(400).json({
        error: "Matricule and secretCode are required in the request body.",
      });
    }

    const insertedRequest = await knex("requests")
      .insert({
        matricule,
        price,
        motif,
        date,
        status: "En attente",
      })
      .returning(["matricule", "price", "motif", "date", "status"]);

    res.status(201).json(insertedRequest);
  } catch (error) {
    console.error("Error retrieving request:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
