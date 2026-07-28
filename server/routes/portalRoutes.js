const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const { getDashboard, getSellerProducts, getPortalOrders } = require("../controllers/portalController");

const router = express.Router();
router.use(protect, allowRoles("admin", "seller"));
router.get("/dashboard", getDashboard);
router.get("/products", allowRoles("seller"), getSellerProducts);
router.get("/orders", getPortalOrders);

module.exports = router;
