const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

router.post(
  "/",
  protect,
  allowRoles("admin", "seller"),
  upload.single("image"),
  (req, res) => {
    console.log("Upload API hit");
    console.log("File received:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    res.status(200).json({
      success: true,
      image: `/uploads/${req.file.filename}`,
    });
  }
);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error("Upload error:", err);
  res.status(400).json({ error: err.message || "Upload failed"});
}
)
    
    

module.exports = router;
