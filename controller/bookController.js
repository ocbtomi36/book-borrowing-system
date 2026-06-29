const { where } = require('sequelize');
const Book = require('../model/bookModel');

exports.getAllBooks = async (req,res,next) => {

    try {
        const books = await Book.findAll();
        if( books.length > 0) { 
            res.status(200).json({message: 'Querry success', data: books});
        } else { 
            res.status(200).json({message: 'There is no data in database'});
        }
    } catch (error) {
        return next(error)
    }
}

exports.getOneBook = async (req,res,next) => {
        const book = req.book;
        return res.status(200).json({message: 'Querry success', data: book});
}
exports.insertBook = async (req,res,next) => {
    const { title } = req.body;
    try {
        const insertBook = await Book.create({
            title: title
        });
        return res.status(201).json({ message: "Book title inserted successfully", data: insertBook});
        } catch (error) {
            return next(error);
    }
}
exports.updateBook = async (req,res,next) => {
    const { title } = req.body;
    const dbBookId = await Book.findOne({
        where: {
            title: title
        }
    });
    const paramBookId = req.params.idbook;
    try{
        if(dbBookId !== null) {
            const { id_book } = dbBookId.dataValues;
            if(id_book.toString() !== paramBookId) {

                const error = new Error('Title must be uinique');
                error.statusCode = 409;
                next(error);
            } 
        }
        await Book.update({ title: title},{
            where: {
                id_book: paramBookId
            }
        });
        return res.status(201).json({ message: "Car updated successfully"});
    } catch (error) {
        return next(error);
    }
}