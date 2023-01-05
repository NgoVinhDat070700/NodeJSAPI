const admin = require("../common/firebase");
const User = require("../models/Auth.model");

const authCheck = async (req, res, next) => {
  // console.log(req.headers); // token
  try {
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);  
    req.user = firebaseUser;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

const isAuthenticatedUser = async (req, res, next) => {
  try {
    const { email } = req.user;
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) throw { status: 404, message: `${email} not found` };
    if (["deleted", "inactive"].includes(foundUser.status))
      throw { status: 400, message: `${email} is inactive` };
    if (!foundUser.emailVerified) throw { status: 400, message: `${email} hasn't been verified!` };
    req.user = foundUser;
    next();
  } catch (err) {
    res.status(err?.status || 400).json({ success: false, err: err.message });
  }
};

const adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const foundAdmin = await User.findOne({ email }).exec();
  if (!foundAdmin) throw { status: 404, message: `${email} not found` };
  if (["deleted", "inactive"].includes(foundAdmin.status))
    throw { status: 400, message: `${email} is inactive` };

  if (foundAdmin.role !== "admin") {
    res.status(403).json({
      err: "Admin resource. Access denied.",
    });
  } else {
    req.user = foundAdmin;
    next();
  }
};

module.exports = { authCheck: authCheck, isAuthenticatedUser: isAuthenticatedUser, adminCheck: adminCheck}
