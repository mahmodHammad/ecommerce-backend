// i think i should put products as a part of categories

const mongoose = require("mongoose");

const Cat = new mongoose.Schema({
  title: { type: String, require: true }
  //products
});

const categoryModel = mongoose.model("categories", Cat);

module.exports = categoryModel;
