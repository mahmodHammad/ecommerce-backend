const mongoose = require("mongoose");

const Prod = new mongoose.Schema({
  title: { type: String, require: true },
  price: { type: Number, require: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" }
});

const categoryModel = mongoose.model("products", Prod);

module.exports = categoryModel;
