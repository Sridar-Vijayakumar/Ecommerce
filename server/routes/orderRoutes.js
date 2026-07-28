const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
} = require("../controllers/orderController");

const admin = require("../middleware/adminMiddleware")

const {
  protect
} = require("../middleware/authMiddleware");

router.post("/", protect, placeOrder);

router.get("/myorders", protect, getMyOrders);

router.get("/", protect, admin, getOrders);

router.get("/:id", protect, getOrderById);

router.put(
  "/:id/deliver",
  protect,
  admin,
  updateOrderToDelivered
);

module.exports = router;