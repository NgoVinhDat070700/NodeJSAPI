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
  "/createProduct",upload,
  verifyTokenAndAdmin,
  ProductController.createProduct
);
router.get("/find/:_id", ProductController.findProduct);
router.put(
  "/updateProduct/:_id",upload,
  verifyTokenAndAdmin,
  ProductController.updateProduct
);
router.delete(
  "/deleteProduct/:_id",
  verifyTokenAndAdmin,
  ProductController.deleteProduct
);


module.exports = router;
