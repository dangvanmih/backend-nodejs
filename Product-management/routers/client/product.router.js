const express = require("express");
const router = express.Router() //tạo các router con


  router.get('/', (req, res) => {
    res.render("client/pages/products/index")
  })


  module.exports = router;