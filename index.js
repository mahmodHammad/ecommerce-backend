const express = require("express");
const mongoose = require("mongoose");

const app = express();
const categories = require("./routes/categories");
const products = require("./routes/products");

mongoose
  .connect("mongodb://localhost/EC")
  .then(e => console.log("connected to DB"))
  .catch(e => console.log(e));

app.use(express.json());
app.use("/api/categories", categories);
app.use("/api/products", products);

app.get("/", (req, res) => {
  res.send("hello at E commerce home page");
});

const port = 4000;
app.listen(port, () => console.log("connected at port : " + port));
