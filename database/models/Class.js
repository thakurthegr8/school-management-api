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
      match: [/^[A-Z]{1}$/, "Section can only be of single character"],
    },
  },
  { timestamps: true }
);

ClassSchema.index({ subject: 1, section: 1 }, { unique: true });

const Class = mongoose.model("Class", ClassSchema);

module.exports = Class;
