const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// Admin Routes
router.get("/", protect, admin, getUsers);

router.get("/:id", protect, admin, getUserById);

router.put("/:id", protect, admin, updateUser);

router.delete("/:id", protect, admin, deleteUser);

// User Profile Routes
router.get("/profile", protect, getUserProfile);

router.put("/profile", protect, updateUserProfile);

module.exports = router;


