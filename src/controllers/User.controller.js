const User = require("../models/Auth.model");
const updateUser = async (req,res)=>{
    try{
        const update = await User.findByIdAndUpdate(
            req.params._id,
            {...req.body}
        )
        res.status(200).json({message:'Update success',update})
    }
    catch (err){
        res.status(500).json(err)
    }
}
const deleteUser = async (req, res) => {
    try {
      const deleteUs = await User.findByIdAndDelete(req.params._id);
      res.status(200).json({message:"User has been deleted...",deleteUs});
    } catch (err) {
      res.status(500).json(err);
    }
  }

const findUser = async (req, res) => {
    try {
      const user = await User.findById(req.params._id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  }

const getAllUser = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await User.countDocuments({});
    const totalPages =  Math.ceil(total / pageSize)
    if (page > totalPages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }
    try {
      const users = await User.find().limit(pageSize).skip(skip).sort({ createdAt: -1 }).exec();
      res.status(200).send({users,total,totalPages});
    } catch (err) {
      res.status(500).json(err);
    }
  }
  const searchUser = async (req, res) => {
    try {
      const email = req.query.email;
      console.log("email",email)
      const search = await User.find({
        email:{$regex:email,$options:'si'}
      })
      console.log("search",search)
      res.status(200).json(search);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  const currentUser = async (req, res) => {
    const { email } = req.user;
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.status(404).json({ success: false, err: `${email} not found!` });
    if (["deleted", "inactive"].includes(foundUser.status))
      return res.status(401).json({ success: false, err: `${email} is inactive user` });
    res.status(200).json(foundUser);
  }

  const createOrUpdateUser = async (req, res) =>{
    const {name, email, phone, email_verified} = req.user
    const user = await User.findOneAndUpdate(
      { email },
      {username:name, phone, emailVerified: email_verified},
      {new: true}
    );
    if(user) {
      res.status(200).json(user)
    }
    else{
      const newUser = await new User({
        email,
        username: name ?? email.split("@")[0],
        emailVerified: email_verified
      }).save();
      res.status(200).json(newUser);
    }
  }

module.exports = {getAllUser:getAllUser,updateUser:updateUser,findUser:findUser,deleteUser:deleteUser,searchUser:searchUser, currentUser: currentUser, createOrUpdateUser:createOrUpdateUser}