const router = require("express").Router();
const NewsController = require("../controllers/News.controller");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyToken.controller");
const upload = require('../utils/uploadImage')
router.get("/", NewsController.getAllNews);
router.post(
  "/createNews",upload,
  verifyTokenAndAdmin,
  NewsController.createNews
);
router.get("/find/:_id", NewsController.findNews);
router.put(
  "/updateNews/:_id",upload,
  verifyTokenAndAdmin,
  NewsController.updateNews
);
router.delete(
  "/deleteNews/:_id",
  verifyTokenAndAdmin,
  NewsController.deleteNews
);


module.exports = router;
