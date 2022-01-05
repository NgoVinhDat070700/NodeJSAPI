const router = require("express").Router();
const AuthController = require("../controllers/Auth.controller");
const UserController = require("../controllers/User.controller");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("../controllers/verifyToken.controller");
router.get('/',verifyTokenAndAdmin,UserController.getAllUser)
router.put('/updateUser/:_id',verifyTokenAndAuthorization,UserController.updateUser)
router.delete('/deleteUser/:_id',verifyTokenAndAdmin,UserController.deleteUser)
router.get('/find/:_id',verifyTokenAndAdmin,UserController.findUser)
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
module.exports = router;
