const Order = require("../models/Order.model");

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

module.exports = {
  createOrder: createOrder,
  updateOrder: updateOrder,
  deleteOrder: deleteOrder,
  getAll: getAll,
  getUserOrder: getUserOrder,
  incomeMonthly: incomeMonthly,
};
