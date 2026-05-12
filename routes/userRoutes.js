const express = require('express');
const { body } = require('express-validator');
const userController = require('../controller/userController');
const router = express.Router();


router.get('/users',userController.getAllUsers);
router.get('/user/:iduser',userController.getOneUsers);

module.exports = router;