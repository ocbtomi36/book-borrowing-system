const { validationResult } = require('express-validator');

const incommingDataResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation Failed');
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
        };
    next();

};

function typeNumberValidator(fieldname) {
    return function (req,res,next) {
        const value = req.body[fieldname];
        if(typeof value !== 'number') {
            const error = new Error(`${fieldname} field must be number`);
            error.statusCode = 400;
            return next(error);
        }
        next();
    };
}
module.exports = {
    incommingDataResult,
    typeNumberValidator
};