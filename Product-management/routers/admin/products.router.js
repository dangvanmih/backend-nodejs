const express = require("express");
const router = express.Router() //tạo các router con
const controller = require("../../controller/admin/product-controller")
  router.get('/', controller.products);
  router.patch('/change-status/:status/:id', controller.changeStatus);
  module.exports = router;