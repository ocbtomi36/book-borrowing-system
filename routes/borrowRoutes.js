const express = require('express');
const router = express.Router();

const borrowController = require('../controller/borrowController');
const validateAllowedFields = require('../middleware/validateAllowedFields');
const borrowJsonValidator = require('../validators/borrowJsonValidate');
const BorrowDataValidateMiddleware = require('../middleware/borrowDataValidateMiddleware');
const BookDataValidateMiddleware = require('../middleware/bookDataValidateMiddleware');
const { incommingDataResult } = require('../validators/validationResult');
const authChain = require('../middleware/auth/auth-chain');

const insertUpdateBorrowFields = ["BookIdBook","due_date"];


router.post('/borrow',authChain,validateAllowedFields(insertUpdateBorrowFields),[borrowJsonValidator],BookDataValidateMiddleware.checkBookId,BorrowDataValidateMiddleware.validateDueDate,borrowController.insertBorrow);

module.exports = router;