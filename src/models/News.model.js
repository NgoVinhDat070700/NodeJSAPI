const mongoose = require("mongoose");

const NewSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    video: { type: String },
    desc: { type: String, required:true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("News", NewSchema);
