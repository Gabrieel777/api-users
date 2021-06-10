const express = require("express")
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const adminAuth = require("../middleware/adminAuth")
const User = require("../models/User");


router.get('/', HomeController.index);

router.get('/user', adminAuth, UserController.index);

router.get('/user/:id', adminAuth, UserController.findUser);

router.post('/user', adminAuth, UserController.create);

router.put('/user', adminAuth, UserController.update);

router.delete('/user/:id', adminAuth, UserController.remove);

router.post("/recoverpassword", UserController.recoverPassword);

router.post("/changepassword", UserController.changePassword);

router.post("/login", UserController.login);


module.exports = router;