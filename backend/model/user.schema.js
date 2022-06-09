const { string } = require("joi");
const mongoose = require("../DataBase/connection");

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  path: String,
});

module.exports = mongoose.model("User", userSchema);
