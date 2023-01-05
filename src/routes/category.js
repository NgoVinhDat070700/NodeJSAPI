const router = require("express").Router();
const { authCheck, adminCheck } = require("../controllers/Auth.controller");
const CategoryController = require("../controllers/Category.controller");
const upload = require("../utils/uploadImage")
router.get("/", CategoryController.getAllCategory);
router.post(
  "/",
  authCheck,adminCheck,upload,
  CategoryController.createCategory
);
router.put(
  "/:_id",
  authCheck,adminCheck,upload,
  CategoryController.updateCategory
);
router.delete(
  "/:_id",
  authCheck,adminCheck,
  CategoryController.deleteCategory
);
module.exports = router;
