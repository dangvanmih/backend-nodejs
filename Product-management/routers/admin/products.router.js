const express = require("express");
const router = express.Router() //tạo các router con
const controller = require("../../controller/admin/product-controller")
  router.get('/', controller.products);

  router.patch('/change-status/:status/:id', controller.changeStatus);

  router.patch("/change-multi-status", controller.changeMulti);

  router.delete('/delete/:id', controller.deleteItem);

  module.exports = router;