const jwt = require("jsonwebtoken");
const DBuser = require("../models/user");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// router.get("/", (req, res) => {
//   DBuser.find({}, (err, data) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     res.send(data);
//   });
// });

router.post("/", async (req, res) => {
  //dont forget to do validation on user inputs

  //dont forget to make sure if user is admin or not
  const user = await DBuser.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("email is NOT correct");
  }

  const auth = bcrypt.compare(req.body.password, user.password);

  if (!auth) {
    res.status(400).send("invalid Password");
  }

  const token = jwt.sign({ _id: newuser._id, admin: req.body.admin }, "key");

  res.send(token);
});

module.exports = router;
