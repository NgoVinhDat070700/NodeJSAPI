const User = require("../models/Auth.model");
const updateUser = async (req,res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,process.env.PASS
        ).toString()
    }
    try{
        const update = await User.findByIdAndUpdate(
            req.params._id,
            {
                $set:req.body,
            },
            {new:true}
        )
    }
    catch (err){
        res.status(500).json(err)
    }
}
const deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params._id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  }

const findUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  }

const getAllUser = async (req, res) => {
    const query = req.query.new;
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

module.exports = {getAllUser:getAllUser,updateUser:updateUser,findUser:findUser,deleteUser:deleteUser}