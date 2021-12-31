const AuthModel = require("../models/Auth.model");
const { authSchema } = require("../validations/validation_schema");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const newUser = new AuthModel({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS),
  });
  try {
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
const login = async (req, res) => {
  try {
    const user = await AuthModel.findOne({
      username: req.body.username,
    });

    !user && res.status(401).json("Wrong User Name");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    originalPassword != inputPassword && res.status(401).json("Wrong Password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = { register: register, login: login };
