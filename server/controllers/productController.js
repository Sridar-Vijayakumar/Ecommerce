const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      seller: req.user.role === "seller" ? req.user._id : req.body.seller,
      stock: req.body.stock ?? req.body.countInStock ?? 0,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const pageSize = Math.min(Number(req.query.limit) || 12, 48);
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const category = req.query.category
      ? {
          category: req.query.category,
        }
      : {};

    const filter = {
      ...keyword,
      ...category,
    };
    if (req.query.brand) filter.brand = req.query.brand;
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
    }
    if (req.query.rating) filter.rating = { $gte: Number(req.query.rating) };
    if (req.query.inStock === "true") filter.stock = { $gt: 0 };
    if (req.query.offers === "true") filter.discount = { $gt: 0 };
    if (req.query.mine === "true" && req.user?.role === "seller") filter.seller = req.user._id;

    const count = await Product.countDocuments(filter);

    let query = Product.find(filter);

    const sorts = {
      low: { price: 1 },
      high: { price: -1 },
      newest: { createdAt: -1 },
      best: { sold: -1 },
      rated: { rating: -1 },
    };
    query = query.sort(sorts[req.query.sort] || { createdAt: -1 });

const products = await query
  .limit(pageSize)
  .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      totalProducts: count,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (req.user.role === "seller" && product.seller?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only update your own products" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, stock: req.body.stock ?? req.body.countInStock ?? product.stock },
      {
        new: true,
      }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (req.user.role === "seller" && product.seller?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own products" });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

