const express = require("express");
const router = express.Router() //tạo các router con
const validates = require("../../validates/admin/auth.validate")
const controller = require("../../controller/admin/auth-controller")
  router.get('/login', controller.login);
  router.post('/login', validates.loginPost, controller.loginPost);
  router.get('/logout', controller.logout);
module.exports = router;