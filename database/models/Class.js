const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassSchema = new Schema(
  {
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    section: {
      type: String,
      required: true,
      unique: true,
      match: [/^[A-Z]{1}$/, "Section can only be of single character"],
    },
  },
  { timestamps: true }
);

const Class = mongoose.model("Class", ClassSchema);

module.exports = Class;
