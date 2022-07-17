const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemsSchema = new Schema({
    itemID: {
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
  
  const CartItems = mongoose.model('CartItems', cartItemsSchema);
  
  module.exports = CartItems;
  