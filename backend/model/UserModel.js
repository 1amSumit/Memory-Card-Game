const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Player must have the username"],
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
});

const USER = new mongoose.model("USER", UserSchema);
module.exports = USER;
