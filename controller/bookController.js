const { where } = require('sequelize');
const Book = require('../model/bookModel');

exports.getAllBooks = async (req,res,next) => {

    try {
        const books = await Book.findAll();
        console.log(books)
        if( books.length > 0) { 
            res.status(200).json({message: 'Querry success', data: books});
        } else { 
            res.status(200).json({message: 'There is no data in database'});
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.getOneBook = async (req,res,next) => {
    try {
        const book = req.book;
        return res.status(200).json({message: 'Querry success', data: book});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
exports.insertBook = async (req,res,next) => {
    const { title } = req.body;
    try {
        const insertBook = await Book.create({
            title: title
        });
        return res.status(201).json({ message: "Book title inserted successfully"});
        } catch (error) {
        res.status(500).json({message: error.message})
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
                return res.status(409).json({message: "Title must be unique"});
            } 
        }
        await Book.update({ title: title},{
            where: {
                id_book: paramBookId
            }
        });
        return res.status(201).json({ message: "Car updated successfully"});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}