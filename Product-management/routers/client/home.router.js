const express = require("express");
const router = express.Router() //tạo các router con


  router.get('/', (req, res) => {
    res.render("client/pages/home/index")
  })


  module.exports = router;