const Category = require("../models/Category.model");

const createCategory = async (req, res) => {
  let image = req.file.filename
  const newCategory = new Category({namecategory:req.body.namecategory,image:image,status:req.body.status});
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 }).exec();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateCategory = async (req, res) => {
  try {
    let image = req.file.filename;
    const updateCat = await Category.findByIdAndUpdate(
      req.params._id,
      {...req.body,image:image}
    );
    res.status(200).send(updateCat);
  } catch (err) {
    res.status(203).send({ message: "Update faild" });
  }
};
const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndRemove(req.params._id);
    res.status(200).send({ message: "Delete category success!" });
  } catch (err) {
    res.status(203).send({ message: "Delete category faild" });
  }
};
module.exports = {
  createCategory: createCategory,
  getAllCategory: getAllCategory,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,
};
