const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const WishlistSchema = mongoose.Schema(
  {
    modelId: { type: ObjectId, refPath: "onModel" },
    onModel: {
      type: String,
      required: true,
      enum: ["Product"],
    },
    createdBy: { type: ObjectId, ref: "Auth" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", WishlistSchema);
