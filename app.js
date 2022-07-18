const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Reservations = require("./models/reservations");
const CartItems = require("./models/cartItems");

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
    orderID: data.orderID,
    client: data.client,
  });

  Reservations.find({ date: data.date, time: data.time, table: data.table })
    .then((result) => {
      if (result.length !== 0) {
        res.send("Already reserved");
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

app.post("/new-order", (req, res) => {
  const data = req.body.data;

  data.id.forEach((el) => {
    const cartItems = new CartItems({
      itemID: el,
      orderID: data.orderID,
      client: data.client,
    });

    cartItems.save();
  });

  res.send("Success");
});

app.post("/orders-list", (req, res) => {
  const data = req.body.data;

  let orderDetails = [];
  let dishes = [];

  let orderID;

  Reservations.find({ client: data }).then((result) => {
    orderID = result[0].orderID;

    result.map((el) => {
      orderDetails.push({
        client: el.client,
        date: el.date,
        time: el.time,
        table: el.table,
        orderID: el.orderID,
        dishes: dishes.filter((dish) => dish.orderID === el.orderID),
      });
    });

    res.send(orderDetails);
  });

  CartItems.find({ client: data }).then((cartResult) => {
      cartResult.map((el) => {
        dishes.push({
          itemID: el.itemID,
          orderID: el.orderID,
        })
      })
  });
});

const port = process.env.PORT || 3001;

app.listen(port);
