const mongoose = require("mongoose");
const USER = require("./UserModel");

const ScoreSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
    required: true,
  },
});

const SCORE = new mongoose.model("Score", ScoreSchema);
module.exports = SCORE;
