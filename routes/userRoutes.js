const express = require('express');
const { body } = require('express-validator');
const userController = require('../controller/userController');
const router = express.Router();
const userDataValidateMiddleware = require('../middleware/userDataValidateMiddleware');


router.get('/users',userController.getAllUsers);
router.get('/user/:iduser',userDataValidateMiddleware.checkUserId,userController.getOneUsers);

module.exports = router;