const Product = require("../models/Product.model");

const getAllProducts = async (req, res) => {
  try {
    const allProduct = await Product.find().sort({ createdAt: -1 }).exec();
    res.status(200).send(allProduct);
  } catch (err) {
    res.status(500).send(err);
  }
};
const createProduct = async (req, res) => {
  let image = req.file.filename
  const newProduct = new Product({...req.body,image:image});

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
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
        ...req.body,image:image
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params._id);
    res.status(200).json("Product has been deleted...");
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
// const findProductByCategory = async (req,res)=>{
//   try{
//     const productByCate = await Product.find(req.params.category_id)

//   }
// }
module.exports = {
  getAllProducts: getAllProducts,
  createProduct: createProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  findProduct: findProduct,
};
