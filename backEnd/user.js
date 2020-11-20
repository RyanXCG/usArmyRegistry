const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  avator: {
    data: Buffer,
    contentType: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  supID: {
    type: mongoose.ObjectId,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
