const { authCheck, adminCheck } = require("../controllers/Auth.controller");
const { getInComeStats, getUsersStats, getStatusStats } = require("../controllers/Order.controller");

const router = require("express").Router();
router.get("/stats/income", authCheck, adminCheck, getInComeStats);
router.get("/stats/users", authCheck, adminCheck, getUsersStats);
router.get("/stats/statuses", authCheck, adminCheck, getStatusStats);

module.exports = router