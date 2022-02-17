const Product = require("../models/Product.model");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const getAllProducts = async (req, res) => {
  try {
    const allProduct = await Product.find().sort({ createdAt: -1 }).exec();
    res.status(200).send(allProduct);
  } catch (err) {
    res.status(500).send(err);
  }
};
const createProduct = async (req, res) => {
  let image = req.file.filename;
  const newProduct = new Product({ ...req.body, image: image });

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json({message:'thêm thành công',savedProduct});
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateProduct = async (req, res) => {
  try {
    let image = req.file.filename;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params._id,
      {
        ...req.body,
        image: image,
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
    res.status(200).json({message:"Product has been deleted...",deletePr});
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
    console.log("nameproduct",nameproduct)
    const search = await Product.find({
      nameproduct:{$regex:nameproduct,$options:'si'}
    })
    console.log("search",search)
    res.status(200).json(search);
  } catch (err) {
    res.status(400).json(err);
  }
};
const searchProductByCate = async (req, res) => {
  try {
    const category_id = req.query.category_id;
    console.log("category_id",category_id)
    const search = await Product.find({
      category_id:{$regex:category_id,$options:'si'}
    })
    console.log("search",search)
    res.status(200).json(search);
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
