const { body } = require('express-validator');

    const userJsonValidate = [
        body('given_name').trim().isLength({min:1,max:255}).withMessage('length of given name is incorrect'),
        body('family_name').trim().isLength({min:1,max:255}).withMessage('length of family name is incorrect'),
        body('pin_number').trim().isLength({min:3,max:8}).withMessage('length of pin number is incorrect'),
        body('email').trim().isLength({min:1,max:255}).withMessage('length of email is incorrect'),
        body('email').trim().isEmail().normalizeEmail().withMessage("this field must be an valid e-mail format"),
        body('password').trim().isLength({min:1,max:100}).withMessage('length of password is incorrect'),
];

module.exports = userJsonValidate;