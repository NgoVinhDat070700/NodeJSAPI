const router = require("express").Router();
const ProductController = require("../controllers/Product.controller");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyToken.controller");

router.get("/", ProductController.getAllProducts);
router.post(
  "/createProduct",
  verifyTokenAndAdmin,
  ProductController.createProduct
);
router.get("/find/:_id", ProductController.findProduct);
router.put(
  "/updateProduct/:_id",
  verifyTokenAndAdmin,
  ProductController.updateProduct
);
router.delete(
  "/deleteProduct",
  verifyTokenAndAdmin,
  ProductController.deleteProduct
);

module.exports = router;
