const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    facebook: {
      uid: String,
      token: String,
      email: { type: String, trim: true}
      
    },
    google: {
      uid: String,
      token: String,
      email: { type: String, trim: true}
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Auth", UserSchema);
