const mongoose = require("mongoose");
const { getTokenSourceMapRange } = require("typescript");
const Schema = mongoose.Schema;

const reservationsSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  table: {
    type: Number,
    required: true,
  },
  orderID: {
    type: Number,
    required: true,
  },
  client: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Reservations = mongoose.model('Reservations', reservationsSchema);

module.exports = Reservations;
