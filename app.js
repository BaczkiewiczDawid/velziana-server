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

console.log(dbURI);

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));

app.post("/reservation", (req, res) => {
  const data = req.body.data;

  const reservations = new Reservations({
    date: data.date,
    time: data.time,
    table: data.table,
  });

  Reservations.find({ date: data.date, time: data.time, table: data.table })
    .then((result) => {
      if (result.length !== 0) {
        res.send('Already reserved')
      } else {
        reservations
          .save()
          .then((result) => {
            res.send(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => console.log(err));
});

const port = process.env.PORT || 3001;

app.listen(port);
