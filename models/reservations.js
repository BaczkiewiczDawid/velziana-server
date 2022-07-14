const mongoose = require("mongoose");
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
}, { timestamps: true });

const Reservations = mongoose.model('Reservations', reservationsSchema);

module.exports = Reservations;
