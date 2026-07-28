const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const  admin  = require("../middleware/adminMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", protect, allowRoles("admin", "seller"), createProduct);
router.put("/:id", protect, allowRoles("admin", "seller"), updateProduct);
router.delete("/:id", protect, allowRoles("admin", "seller"), deleteProduct);

module.exports = router;
