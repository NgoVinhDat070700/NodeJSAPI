const router = require("express").Router();
const { authCheck, adminCheck, isAuthenticatedUser } = require("../controllers/Auth.controller");
const { refundPayment, processPayment } = require("../controllers/Order.controller");
const orderController = require("../controllers/Order.controller");

router.get("/", authCheck,adminCheck, orderController.getAll);
router.post("/", authCheck, orderController.createOrder);
router.put("/:id", authCheck,adminCheck, orderController.updateOrder);
router.delete("/:id", authCheck,adminCheck, orderController.deleteOrder);
router.get(
  "/find/:userId",
  orderController.getUserOrder
);
router.get("/income", authCheck,adminCheck, orderController.incomeMonthly);
router.post("/refund/:orderId", authCheck, adminCheck, refundPayment);
router.post("/create-payment-intent", authCheck, isAuthenticatedUser, processPayment);
module.exports = router