const express = require('express');
const router = express.Router();

const borrowController = require('../controller/borrowController');
const validateAllowedFields = require('../middleware/validateAllowedFields');
const boJsonValidator = require('../validators/bookJsonValidate');
const BorrowDataValidateMiddleware = require('../middleware/borrowDataValidateMiddleware');
const BookDataValidateMiddleware = require('../middleware/bookDataValidateMiddleware');
const { incommingDataResult } = require('../validators/validationResult');
const authChain = require('../middleware/auth/auth-chain');

router.post('/borrow',authChain,BookDataValidateMiddleware.checkBookId,borrowController.insertBorrow);

module.exports = router;