const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        qty: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    phone:{type:String},
    status: { type: String, default: "Unpaid" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);