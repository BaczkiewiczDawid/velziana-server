const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Reservations = require("./models/reservations");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbURI = process.env.DB_URI;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));

app.get("/reservation", (req, res) => {
  const message = 'Reservation added';

  res.send(message);
});

const port = process.env.PORT || 3001;

app.listen(port);
