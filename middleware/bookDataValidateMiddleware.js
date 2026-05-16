const Book = require('../model/bookModel');


class BookDataValidateMiddleware {

    static async checkBookId(req,res,next){
        const { idbook } = req.params;
        const loadedBook = await Book.findByPk(idbook);
        if(loadedBook === null) {
            return res.status(409).json({message: 'There is no title with that id'})
        }
        req.book = loadedBook;
        next();
    } 

    static async isBookTitle(req,res,next){
        const { title } = req.body;
        const loadedBookByTitle = await Book.findOne({
            where: {
                title:title
            }
        })
        if(loadedBookByTitle !== null) {
            return res.status(409).json({message: 'This title already exist'})
        }
        next();
    }

}
module.exports = BookDataValidateMiddleware;