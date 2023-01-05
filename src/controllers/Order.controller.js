const Order = require("../models/Order.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET || "sk_test_");
const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const saveOrder = await newOrder.save();
    res.status(200).json({message:'Thanh toán thành công',saveOrder});
  } catch (error) {
    res.status(500).json({message:'Thanh toán thất bại',error});
  }
};
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};
const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * pageSize;
  const total = await Order.countDocuments({});
  const totalPages =  Math.ceil(total / pageSize)
  if (page > totalPages) {
    return res.status(404).json({
      status: "fail",
      message: "No page found",
    });
  }
  try {
    const phone = req.query.phone
    const orders = await Order.find(phone ?{
      phone:{$regex:phone,$options:'si'}}:{}).populate('userId').limit(pageSize).skip(skip).sort({ createdAt: -1 }).exec();
    res.status(200).json({orders, total, totalPages});
  } catch (err) {
    res.status(500).json(err);
  }
};
const getUserOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};
const incomeMonthly = async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  console.log(date)
  const lastMonth = new Date(date.setMonth(date.getMonth()-1));
  console.log("last",lastMonth)
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));
  console.log("pre",previousMonth)

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: date },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    console.log("income",income)
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};

const processPayment = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: { integration_check: "accept_a_payment" },
    });
    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
}

const refundPayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const foundOrder = await Order.findById(orderId);
    if (!foundOrder) throw { status: 404, message: `Not found order with Id:${orderId}!` };
    if (String(foundOrder.paymentInfo.status).toUpperCase() === "COD")
      throw { status: 400, message: `Action denied since OrderId:${orderId} is COD payment!` };
    //
    const refund = await stripe.refunds.create({
      payment_intent: foundOrder.paymentInfo.id,
      amount: foundOrder.paymentInfo.amount * 100,
      reason: "requested_by_customer",
    });

    res.status(200).json({
      success: true,
      status: refund.status,
    });
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
}
module.exports = {
  createOrder: createOrder,
  updateOrder: updateOrder,
  deleteOrder: deleteOrder,
  getAll: getAll,
  getUserOrder: getUserOrder,
  incomeMonthly: incomeMonthly,
};
