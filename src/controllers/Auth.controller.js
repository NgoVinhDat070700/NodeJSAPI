const AuthModel = require("../models/Auth.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Token = require("../models/Token.model");

let refreshTokens = []

const refresh = async (req, res) =>{
  const refreshToken = req.body.token;
  if(!refreshToken) return res.status(401).json("You are not authenticated!")
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }
  jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
}

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin },  process.env.JWT_SEC, { expiresIn: "3d" });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey", { expiresIn: "30d" });
};


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
      email: req.body.email,
    });

    if(!user) return res.status(401).json("Wrong User Name");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    if(originalPassword != inputPassword)
      
      return res.status(401).json("Wrong Password");
    const token = await generateAuthTokens(user)
    const { password, ...others } = user._doc;
    return res.status(200).json({ ...others, token});
  } catch (err) {
    return res.status(500).json(err);
  }
};
// const generateToken = (userId, expires, type, secret = process.env.JWT_SEC) => {
//   const payload = {
//     sub: userId,
//     exp: expires,
//     type,
//   };
//   return jwt.sign(payload, secret);
// };
// const saveToken = async (token, userId, expires, type, blacklisted = false) => {
//   const tokenDoc = await Token.create({
//     token,
//     user: userId,
//     expires: expires.toDate(),
//     type,
//     blacklisted,
//   });
//   return tokenDoc;
// };

const generateAuthTokens = async (user) => {

  const accessToken = generateAccessToken(user);
  console.log(accessToken)
  const refreshToken = generateRefreshToken(user);
  console.log('refesh',refreshToken)
  await Token.create({token:refreshToken, user: user._id})

  return {
    accessToken,
    refreshToken
  };
};
const logoutService = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

const logout = async (req, res) => {
  await logoutService(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
};
module.exports = { register: register, login: login, refresh: refresh, generateAuthTokens: generateAuthTokens, logout: logout };
