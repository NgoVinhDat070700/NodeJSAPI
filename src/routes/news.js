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
  "/",
  verifyTokenAndAdmin,
  NewsController.createNews
);
router.get("/find/:_id", NewsController.findNews);
router.put(
  "/:_id",
  verifyTokenAndAdmin,
  NewsController.updateNews
);
router.delete(
  "/:_id",
  verifyTokenAndAdmin,
  NewsController.deleteNews
);
router.get('/search',NewsController.searchNews)


module.exports = router;
