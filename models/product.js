const mongoose = require("mongoose");

const Prod = new mongoose.Schema({
  title: { type: String, require: true },
  price: { type: Number, require: true },
  image: {
    type: String,
    default:
      "https://www.assignmentpoint.com/wp-content/uploads/2011/10/new-product-logo.jpg"
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" }
});

const categoryModel = mongoose.model("products", Prod);

module.exports = categoryModel;
