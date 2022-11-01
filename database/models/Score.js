const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

const Score = mongoose.model("Score", ScoreSchema);

module.exports = Score;
