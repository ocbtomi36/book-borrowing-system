const { body } = require('express-validator');

    const borrowJsonValidate = [
        body('due_date').trim().isLength({min:1,max:255}).isDate().toDate().withMessage('Not valid date format'),
];

module.exports = borrowJsonValidate;