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
  "/createCategory",
  verifyTokenAndAdmin,upload,
  CategoryController.createCategory
);
router.put(
  "/updateCategory/:_id",
  verifyTokenAndAdmin,upload,
  CategoryController.updateCategory
);
router.delete(
  "/deleteCategory/:_id",
  verifyTokenAndAdmin,
  CategoryController.deleteCategory
);
module.exports = router;
