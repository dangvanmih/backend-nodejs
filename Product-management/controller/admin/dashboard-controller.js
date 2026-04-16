// controllers/admin/dashboard.controller.js
const ProductCategory = require("../../models/products-category.model");
const Product = require("../../models/products.model");
const Account = require("../../models/accounts.model");
const User = require("../../models/users.model");

module.exports.dashboard = async (req, res) => {
  const statistic = {
    category: { total: 0, active: 0, inactive: 0 },
    product: { total: 0, active: 0, inactive: 0 },
    account: { total: 0, active: 0, inactive: 0 },
    user: { total: 0, active: 0, inactive: 0 },
  };

  // Thống kê Danh mục
  statistic.category.total = await ProductCategory.countDocuments({ deleted: false });
  statistic.category.active = await ProductCategory.countDocuments({ status: "active", deleted: false });
  statistic.category.inactive = statistic.category.total - statistic.category.active;

  // Thống kê Sản phẩm
  statistic.product.total = await Product.countDocuments({ deleted: false });
  statistic.product.active = await Product.countDocuments({ status: "active", deleted: false });
  statistic.product.inactive = statistic.product.total - statistic.product.active;

  // Thống kê Tài khoản Admin
  statistic.account.total = await Account.countDocuments({ deleted: false });
  statistic.account.active = await Account.countDocuments({ status: "active", deleted: false });
  statistic.account.inactive = statistic.account.total - statistic.account.active;

  // Thống kê Tài khoản Người dùng
  statistic.user.total = await User.countDocuments({ deleted: false });
  statistic.user.active = await User.countDocuments({ status: "active", deleted: false });
  statistic.user.inactive = statistic.user.total - statistic.user.active;

  res.render("admin/pages/dashboard/index", {
    pageTitle: "Trang tổng quan",
    statistic: statistic
  });
};