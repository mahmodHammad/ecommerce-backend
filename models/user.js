const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  password: { type: String, required: true }
});

//THIS FUCKEN SHIT WASTED 1.5 HOURE OF MU TIME !!!!
// schema.statics.getToken = () => {
//   const signer = jwt.sign({ _id: this._id, admin: this.admin }, "dog");
//   return signer;
// };

const userModel = mongoose.model("users", schema);

module.exports = userModel;
