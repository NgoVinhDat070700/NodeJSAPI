const Category = require("../models/Category.model");

const createCategory = async (req, res) => {
  const newCategory = new Category({...req.body});
  try {
    const savedCategory = await newCategory.save()
    ;
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getAllCategory = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * pageSize;
  const total = await Category.countDocuments({});
  const totalPages =  Math.ceil(total / pageSize)
  if (page > totalPages) {
    return res.status(404).json({
      status: "fail",
      message: "No page found",
    });
  }
  try {
    const categories = await Category.find().limit(pageSize).skip(skip).sort({ createdAt: -1 }).exec();
    res.status(200).send({categories,total,totalPages});
  } catch (err) {
    res.status(500).send(err);
  }
};
const updateCategory = async (req, res) => {
  try {
    
    const updateCat = await Category.findByIdAndUpdate(
      req.params._id,
      {...req.body}
    );
    res.status(200).send(updateCat);
  } catch (err) {
    res.status(203).send({ message: "Update faild" });
  }
};
const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndRemove(req.params._id);
    res.status(200).send({ message: "Delete category success!",success: true });
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
