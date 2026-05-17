const Borrow = require('../model/borrowModel');

class BorrowDataValidateMiddleware {

    static async validateDueDate(req, res, next) {
    
    const { due_date } = req.body;
        if(due_date === null) {
            return res.status(409).json({
            message: 'Wrong due date format'});
        }
        if(due_date < Date.now()){
            return res.status(409).json({
            message: 'Due date cant be past or today'});
        }
        next()
    }

}

module.exports = BorrowDataValidateMiddleware;