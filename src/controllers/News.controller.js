const News = require("../models/News.model");

const getAllNews = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * pageSize;
  const total = await News.countDocuments({});
  const totalPages =  Math.ceil(total / pageSize)
  if (page > totalPages) {
    return res.status(404).json({
      status: "fail",
      message: "No page found",
    });
  }
  try {
    const allNews = await News.find({}).populate('category_id').limit(pageSize).skip(skip).sort({ createdAt: -1 }).exec()
    res.status(200).send({allNews , total, totalPages});
  } catch (err) {
    res.status(400).send(err);
  }
};
const createNews = async (req, res) => {
  const newNews = new News({ ...req.body });
  try {
    const saveNews = await newNews.save();
    res.status(200).json({message:"Thêm thành công",saveNews});
  } catch (error) {
    res.status(400).json(err);
  }
};
const updateNews = async (req, res) => {
  try {
    const udNews = await News.findByIdAndUpdate(req.params._id, {...req.body});
    res.status(200).json({message:'Sửa thành công',udNews});
  } catch (error) {
    res.status(400).json(error);
  }
};
const deleteNews = async (req, res) => {
  try {
    const deleteNew = await News.findByIdAndDelete(req.params._id);
    res.status(200).json({message:"News has been deleted...",deleteNew});
  } catch (err) {
    res.status(400).json(err);
  }
};
const findNews = async (req, res) => {
  try {
    const news = await News.findById(req.params._id);
    res.status(200).json(news);
  } catch (err) {
    res.status(400).json(err);
  }
};
const searchNews = async (req, res) => {
  try {
    const title = req.query.title;
    console.log("title",title)
    const search = await News.find({
      title:{$regex:title,$options:'si'}
    })
    console.log("search",search)
    res.status(200).json(search);
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports = {
  getAllNews: getAllNews,
  createNews: createNews,
  updateNews: updateNews,
  findNews: findNews,
  deleteNews: deleteNews,
  searchNews:searchNews
};
