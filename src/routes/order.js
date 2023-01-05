const router = require("express").Router();
const { authCheck, adminCheck } = require("../controllers/Auth.controller");
const orderController = require("../controllers/Order.controller");

router.get("/", authCheck,adminCheck, orderController.getAll);
router.post("/", authCheck,adminCheck, orderController.createOrder);
router.put("/:id", authCheck,adminCheck, orderController.updateOrder);
router.delete("/:id", authCheck,adminCheck, orderController.deleteOrder);
router.get(
  "/find/:userId",
  orderController.getUserOrder
);
router.get("/income", authCheck,adminCheck, orderController.incomeMonthly);
module.exports = router