const Product = require("../models/Product.model");
const Sequelize = require("sequelize");
const mongoose = require('mongoose');
const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * pageSize;
  const total = await Product.countDocuments({});
  const totalPages =  Math.ceil(total / pageSize)
  if (page > totalPages) {
    return res.status(404).json({
      status: "fail",
      message: "No page found",
    });
  }
  try {
    const nameproduct = req.query.nameproduct
    const allProduct = await Product.find(nameproduct ?{
      nameproduct:{$regex:nameproduct,$options:'si'}
    }:{}).populate('category_id').limit(pageSize).skip(skip).sort({ createdAt: -1 }).exec();
    res.status(200).send({allProduct, total,totalPages});
  } catch (err) {
    res.status(500).send(err);
  }
};
const createProduct = async (req, res) => {
  const newProduct = new Product({ ...req.body });

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json({message:'thêm thành công',savedProduct});
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params._id,
      {
        ...req.body
      },
      { new: true }
    );
    res.status(200).json({message:"Sửa thành công",updatedProduct});
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletePr = await Product.findByIdAndDelete(req.params._id);
    res.status(200).json({message:"Product has been deleted...",deletePr,success:true});
  } catch (err) {
    res.status(500).json(err);
  }
};

const findProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params._id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const searchProduct = async (req, res) => {
  try {
    const nameproduct = req.query.nameproduct;
    const allProduct = await Product.find({
      nameproduct:{$regex:nameproduct,$options:'si'}
    })
    res.status(200).send({allProduct});
  } catch (err) {
    res.status(400).json(err);
  }
};
const searchProductByCate = async (req, res) => {
  try {
    const category_id = req.query.category_id;
    console.log(category_id)
    const allProduct = await Product.aggregate([{ $match: { category_id: mongoose.Types.ObjectId(category_id) } }]);
    res.status(200).send({allProduct});
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports = {
  getAllProducts: getAllProducts,
  createProduct: createProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  findProduct: findProduct,
  searchProduct: searchProduct,
  searchProductByCate:searchProductByCate
};
