const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getOrderById,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

// Place a new order
router.post("/", protect, placeOrder);

// Get logged-in user's orders
router.get("/myorders", protect, getMyOrders);

// Get a single order by ID
router.get("/:id", protect, getOrderById);

module.exports = router;