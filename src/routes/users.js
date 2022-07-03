const router = require("express").Router();
const AuthController = require("../controllers/Auth.controller");
const UserController = require("../controllers/User.controller");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("../controllers/verifyToken.controller");
router.get('/',UserController.getAllUser)
router.put('/:_id',verifyTokenAndAuthorization,UserController.updateUser)
router.delete('/:_id',verifyTokenAndAdmin,UserController.deleteUser)
router.get('/find/:_id',verifyTokenAndAdmin,UserController.findUser)
router.get('/search',UserController.searchUser)
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
module.exports = router;
