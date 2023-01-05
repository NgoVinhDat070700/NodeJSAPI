const router = require("express").Router();
const { authCheck, adminCheck } = require("../controllers/Auth.controller");
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
  authCheck,adminCheck,
  ProductController.createProduct
);
router.get("/find/:_id", ProductController.findProduct);
router.put(
  "/:_id",
  authCheck,adminCheck,
  ProductController.updateProduct
);
router.delete(
  "/:_id",
  authCheck,adminCheck,
  ProductController.deleteProduct
);
router.get('/search',ProductController.searchProduct)
router.get('/search_category',ProductController.searchProductByCate)

module.exports = router;
