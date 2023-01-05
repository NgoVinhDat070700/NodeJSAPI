const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: { type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: String,
    emailVerified: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "inactive", "deleted"], default: "active" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Auth", UserSchema);
