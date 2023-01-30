const router = require("express").Router();
const { authCheck, adminCheck } = require("../controllers/Auth.controller");
const UserController = require("../controllers/User.controller");
const { currentUser, createOrUpdateUser } = require("../controllers/User.controller");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("../controllers/verifyToken.controller");
router.get('/',UserController.getAllUser)
router.put('/:_id',authCheck,adminCheck,UserController.updateUser)
router.delete('/:_id',verifyTokenAndAdmin,UserController.deleteUser)
router.get('/find/:_id',UserController.findUser)
router.get('/search',UserController.searchUser)
router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);
module.exports = router;
