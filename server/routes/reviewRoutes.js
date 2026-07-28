const express = require("express");
const router = express.Router();

const {
  createReview,
  getProductReviews,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

// Get all reviews of a product
router.get("/:id/reviews", getProductReviews);

// Add a review to a product
router.post("/:id/reviews", protect, createReview);

module.exports = router;