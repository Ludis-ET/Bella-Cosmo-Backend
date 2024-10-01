const express = require("express");
const { placeOrder, getUserOrders } = require("../controllers/orderController");
const { protectUser, protectAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", placeOrder);

router.get("/:userId", protectAdmin, getUserOrders);

module.exports = router;
