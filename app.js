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

app.get('/reservation', (req, res) => {
    const getReservations = "SELECT * FROM velziana_reservations WHERE date = 1 AND time = '10:00-12:00'";

    db.query(getReservations, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    })
})

console.log('Server running...')

const port = process.env.PORT || 5000;

app.listen(port)