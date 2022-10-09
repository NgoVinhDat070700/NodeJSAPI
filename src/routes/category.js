const router = require("express").Router();
const CategoryController = require("../controllers/Category.controller");
const upload = require("../utils/uploadImage")
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyToken.controller");
router.get("/", CategoryController.getAllCategory);
router.post(
  "/",
  verifyTokenAndAdmin,upload,
  CategoryController.createCategory
);
router.put(
  "/:_id",
  verifyTokenAndAdmin,upload,
  CategoryController.updateCategory
);
router.delete(
  "/:_id",
  verifyTokenAndAdmin,
  CategoryController.deleteCategory
);
module.exports = router;
