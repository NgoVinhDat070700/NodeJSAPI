const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  id: mongoose.SchemaTypes.ObjectId,
  nameproduct: String,
  image: String,
  price: Number,
  quatity: Number,

})
const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref:'Auth', required: true },
    products:{
      type: [productSchema],
      required: true,
      trim: true
    },
    fullname:{type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    amount: { type: Number, required: true },
    totalPrice: {type: Number, default: 0},
    shippingPrice: {
      type: Number,
      default: 0,
    },
    paymentMethods: {type: String, default: "Thanh toán khi nhận hàng"},
    address: { type: String, required: true },
    phone:{type:String},
    orderStatus: {
      value: { type: String, default: "PROCESSING" },
      name: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);