const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

const getDashboard = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const [totalProducts, totalOrders, totalUsers, revenue] = await Promise.all([
        Product.countDocuments(),
        Order.countDocuments(),
        User.countDocuments(),
        Order.aggregate([{ $match: { isPaid: true } }, { $group: { _id: null, total: { $sum: "$totalPrice" } } }]),
      ]);
      return res.json({ totalProducts, totalOrders, totalUsers, totalRevenue: revenue[0]?.total || 0 });
    }

    const products = await Product.find({ seller: req.user._id }).select("_id stock sold");
    const productIds = products.map((product) => product._id);
    const orders = await Order.find({ "orderItems.product": { $in: productIds } });
    const revenue = orders.reduce((sum, order) => sum + order.orderItems.filter((item) => productIds.some((id) => id.equals(item.product))).reduce((itemSum, item) => itemSum + item.price * item.qty, 0), 0);
    return res.json({
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue: revenue,
      lowStock: products.filter((product) => product.stock <= 5).length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPortalOrders = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      return res.json(await Order.find().populate("user", "name email").sort({ createdAt: -1 }));
    }
    const products = await Product.find({ seller: req.user._id }).select("_id");
    const productIds = products.map((product) => product._id);
    const orders = await Order.find({ "orderItems.product": { $in: productIds } }).populate("user", "name email").sort({ createdAt: -1 });
    res.json(orders.map((order) => ({
      ...order.toObject(),
      orderItems: order.orderItems.filter((item) => productIds.some((id) => id.equals(item.product))),
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboard, getSellerProducts, getPortalOrders };
