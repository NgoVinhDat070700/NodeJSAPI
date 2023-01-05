const router = require("express").Router();
const { authCheck, adminCheck } = require("../controllers/Auth.controller");
const NewsController = require("../controllers/News.controller");
const upload = require('../utils/uploadImage')
router.get("/", NewsController.getAllNews);
router.post(
  "/",
  authCheck,adminCheck,
  NewsController.createNews
);
router.get("/find/:_id", NewsController.findNews);
router.put(
  "/:_id",
  authCheck,adminCheck,
  NewsController.updateNews
);
router.delete(
  "/:_id",
  authCheck,adminCheck,
  NewsController.deleteNews
);
router.get('/search',NewsController.searchNews)


module.exports = router;
