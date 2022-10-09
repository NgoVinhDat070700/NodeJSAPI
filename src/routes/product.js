const router = require("express").Router();
const ProductController = require("../controllers/Product.controller");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyToken.controller");
const upload = require('../utils/uploadImage')
router.get("/", ProductController.getAllProducts);
router.post(
  "/",
  verifyTokenAndAdmin,
  ProductController.createProduct
);
router.get("/find/:_id", ProductController.findProduct);
router.put(
  "/:_id",
  verifyTokenAndAdmin,
  ProductController.updateProduct
);
router.delete(
  "/:_id",
  verifyTokenAndAdmin,
  ProductController.deleteProduct
);
router.get('/search',ProductController.searchProduct)
router.get('/search_category',ProductController.searchProductByCate)

module.exports = router;
