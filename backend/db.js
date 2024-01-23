const mongoose = require("mongoose");
const { number, string } = require("zod");

mongoose.connect("");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  lastname: {
    type: String,
    requierd: true,
    trim: true,
    maxlength: 40,
  },
});
const AccountSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    requierd: true,
  },
  balance: {
    type: Number,
    requierd: true,
  },
});

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", AccountSchema);

module.exports = {
  User,
  Account,
};
