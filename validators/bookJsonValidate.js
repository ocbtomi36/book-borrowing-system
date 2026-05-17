const { body } = require('express-validator');

    const bookJsonValidate = [
        body('title').trim().isLength({min:1,max:255}).withMessage('length of title is incorrect'),
];

module.exports = bookJsonValidate;