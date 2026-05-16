const express = require('express');
const { body } = require('express-validator');
const validateAllowedFields = require('../middleware/validateAllowedFields');
const authController = require('../controller/authController');
const userValidator = require('../validators/userJsonValidate');
const UserDataValidateMiddleware = require('../middleware/userDataValidateMiddleware');
const { incommingDataResult } = require('../validators/validationResult');
const router = express.Router();

const insertUpdateUserFields = ["given_name","family_name","pin_number","email","password"];
const login = ["email","password"];
// 
router.post('/signup',validateAllowedFields(insertUpdateUserFields),[userValidator],incommingDataResult,UserDataValidateMiddleware.checkPinNumber,UserDataValidateMiddleware.checkEmail,authController.signup);
router.post('/login',body('email').trim().isEmail().normalizeEmail().withMessage("this field must be an valid e-mail format"),
    body('password').trim().isLength({min:1,max:100}).withMessage('length of password is incorrect'),incommingDataResult,validateAllowedFields(login),UserDataValidateMiddleware.loginUser,authController.login);
module.exports = router;

router.put('/modify/:iduser',validateAllowedFields(insertUpdateUserFields),[userValidator],UserDataValidateMiddleware.checkUserId ,authController.modifyUser);