const express = require("express");
const router = express.Router() //tạo các router con
const controller = require("../../controller/client/user-controller");
const validate = require("../../validates/client/user.validate");

  router.get('/register', controller.register);

  router.post('/register',validate.register, controller.registerPost);

  module.exports = router;