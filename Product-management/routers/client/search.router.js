const express = require("express");
const router = express.Router() //tạo các router con
const controller = require("../../controller/client/search-controller")
  router.get('/', controller.index);

  module.exports = router;