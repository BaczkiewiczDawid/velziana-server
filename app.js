const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Reservations = require("./models/reservations");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5000;

const dbURI =
  "mongodb+srv://dawson:Dawson22@reservations.5g3qx.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port);
    console.log("connected to db");
  })
  .catch((err) => console.log(err));

app.get("/reservation", (req, res) => {
  const reservations = new Reservations({
    date: "14.07.2022",
    time: "14:00 - 16:00",
    table: 3,
  });

  reservations
    .save()
    .then((result) => {
      res.send(result);
      console.log(result)
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.get("/reservation", (req, res) => {
//   const data = req.body.data;
//   console.log('easd')

//   const checkIsAvailable = `SELECT * FROM velziana_reservations WHERE date='${data.date}' AND time='${data.time}'`;

//   const newReservation = `INSERT INTO velziana_reservations VALUES(null, '${data.date}', '${data.time}', 2)`;

//   db.query(checkIsAvailable, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result.length);
//       if (result.length === 0) {
//         db.query(newReservation, (err, result) => {
//           if (err) {
//             console.log(err);
//           } else {
//             res.send(result);
//             console.log(result);
//           }
//         });
//       } else {
//         res.send("Already reserved");
//       }
//     }
//   });
// });

console.log("Server running...");

module.exports = app;

// const port = process.env.PORT || 5000;

