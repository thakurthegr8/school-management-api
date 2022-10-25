const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema(
  {
    code: {
      type: Schema.Types.ObjectId,
      refer: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;
