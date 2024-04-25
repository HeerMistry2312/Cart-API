const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  Price:{
    type: Number,
    required: true
  },
  Desc:{
    type:String,
    required: true
  }
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;