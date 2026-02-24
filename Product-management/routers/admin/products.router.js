const express = require("express");
const router = express.Router() //tạo các router con
const controller = require("../../controller/admin/product-controller")
  router.get('/', controller.products);

  module.exports = router;