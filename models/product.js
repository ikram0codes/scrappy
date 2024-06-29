const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  images: [],
  url: String,
});

module.exports = mongoose.model("Product", productSchema);
