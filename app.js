const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/reservation", (req, res) => {
  const data = req.body.data;

  const checkIsAvailable = `SELECT * FROM velziana_reservations WHERE date='${data.date}' AND time='${data.time}'`;

  const newReservation = `INSERT INTO velziana_reservations VALUES(null, '${data.date}', '${data.time}', 2)`;

  db.query(checkIsAvailable, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result.length);
      if (result.length === 0) {
        db.query(newReservation, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
            console.log(result);
          }
        });
      } else {
        res.send("Already reserved");
      }
    }
  });
});

console.log("Server running...");

const port = process.env.PORT || 5000;

app.listen(port);
