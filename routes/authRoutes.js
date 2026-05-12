const express = require('express');
const { body } = require('express-validator');
const authController = require('../controller/authController');
const router = express.Router();
router.post('/signup',authController.signup);


module.exports = router;