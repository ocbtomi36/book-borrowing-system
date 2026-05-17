const express = require('express');
const { body } = require('express-validator');
const bookController = require('../controller/bookController');
const router = express.Router();
const validateAllowedFields = require('../middleware/validateAllowedFields');
const bookJsonValidator = require('../validators/bookJsonValidate');
const bookDataValidateMiddleware = require('../middleware/bookDataValidateMiddleware');
const { incommingDataResult } = require('../validators/validationResult');

const insertUpdateBookFields = ["title"];

router.get('/books',bookController.getAllBooks);
router.get('/book/:idbook',bookDataValidateMiddleware.checkBookId,bookController.getOneBook);

router.post('/books',validateAllowedFields(insertUpdateBookFields),[bookJsonValidator],incommingDataResult,bookDataValidateMiddleware.isBookTitle,bookController.insertBook);
router.put('/book/:idbook',validateAllowedFields(insertUpdateBookFields),[bookJsonValidator],incommingDataResult,bookDataValidateMiddleware.checkBookId,bookController.updateBook);
module.exports = router;