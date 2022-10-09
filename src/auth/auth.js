const router = require("express").Router();
const { func } = require("joi");
const { session } = require("passport");
const passport = require("passport");
const { generateAuthTokens } = require("../controllers/Auth.controller.js");
require('../passport.js');
const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      data: req.user,
      // cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile","email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "http://localhost:3000/",
    session:true
  }),function(req,res){
    console.log(req.user)
  }
);
const loginGoogle = async (req, res) => {
  const user = await authenGoogle();
  res.send(user);
};
const authenGoogle = () => {
  passport.authenticate('google', async (_error, user, info) => {
    const accessToken = await generateAuthTokens(user);
    return accessToken;
  });
};
router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  }),function(req,res){
    res.send(req.user)
  }
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router