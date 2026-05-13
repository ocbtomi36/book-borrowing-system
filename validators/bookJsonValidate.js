const { body } = require('express-validator');

    const userJsonValidate = [
        body('title').trim().isLength({min:1,max:255}).withMessage('length of title is incorrect'),
];

module.exports = userJsonValidate;