const router = require("express").Router();
const orderController = require("../controllers/Order.controller");

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("../controllers/verifyToken.controller");

router.post("/", verifyToken, orderController.createOrder);
router.put("/:id", verifyTokenAndAdmin, orderController.updateOrder);
router.delete("/:id", verifyTokenAndAdmin, orderController.deleteOrder);
router.get(
  "/find/:userId",
  verifyTokenAndAuthorization,
  orderController.getUserOrder
);
router.get("/", verifyTokenAndAdmin, orderController.getAll);
router.get("/income", verifyTokenAndAdmin, orderController.incomeMonthly);
module.exports = router