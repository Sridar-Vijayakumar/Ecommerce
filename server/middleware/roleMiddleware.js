const allowRoles = (...roles) => (req, res, next) => {
  if (req.user && roles.includes(req.user.role)) return next();
  return res.status(403).json({ message: "You do not have permission to perform this action" });
};

module.exports = allowRoles;
