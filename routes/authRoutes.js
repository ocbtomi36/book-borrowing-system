const express = require('express');
const { body } = require('express-validator');
const validateAllowedFields = require('../middleware/validateAllowedFields');
const authController = require('../controller/authController');
const userValidator = require('../validators/userJsonValidate');
const UserDataValidateMiddleware = require('../middleware/userDataValidateMiddleware');
const { incommingDataResult } = require('../validators/validationResult');
const router = express.Router();

const insertUpdateUserFields = ["given_name","family_name","pin_number","email","password"];

router.post('/signup',validateAllowedFields(insertUpdateUserFields),[userValidator],incommingDataResult,UserDataValidateMiddleware.checkPinNumber,UserDataValidateMiddleware.checkEmail,authController.signup);


module.exports = router;