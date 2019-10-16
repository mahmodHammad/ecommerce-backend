const DBuser = require("../models/user");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/", (req, res) => {
  DBuser.find({}, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(data);
  });
});

router.post("/", async (req, res) => {
  //dont forget to do validation on user inputs
  //encrypt password
  const repeated = await DBuser.findOne({ email: req.body.email });
  if (repeated) {
    return res.status(400).send("this email is used by an other user");
  }
  var newuser = new DBuser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    admin: req.body.admin
  });

  //encrypt password
  const salt = await bcrypt.genSalt(5);
  newuser.password = await bcrypt.hashSync(req.body.password, salt);
  await newuser.save();

  //get token
  const token = jwt.sign({ _id: newuser._id, admin: req.body.admin }, "key");

  res.header("x-token", token).send({
    _id: newuser._id,
    name: newuser.name
  });
});

module.exports = router;
