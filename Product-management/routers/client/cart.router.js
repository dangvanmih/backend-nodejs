const express = require("express");
const router = express.Router() //tạo các router con
const controller = require("../../controller/client/cart-controller")
  router.post('/add/:productId', controller.addPost);

  module.exports = router;