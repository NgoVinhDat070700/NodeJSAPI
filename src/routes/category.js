const router = require("express").Router();
const CategoryController = require("../controllers/Category.controller");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyToken.controller");
router.get("/", CategoryController.getAllCategory);
router.post(
  "/createCategory",
  verifyTokenAndAdmin,
  CategoryController.createCategory
);
router.put(
  "/updateCategory/:_id",
  verifyTokenAndAdmin,
  CategoryController.updateCategory
);
router.delete(
  "/deleteCategory/:_id",
  verifyTokenAndAdmin,
  CategoryController.deleteCategory
);
module.exports = router;
