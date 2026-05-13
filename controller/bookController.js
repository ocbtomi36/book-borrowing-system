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
    const { vin_number, car_performance, engine_size, licence_plate, technical_validity, production_time, color, bodytype, fuel, manufacturer, type } = req.body;
    try {
        
        return res.status(201).json({ message: "Car inserted successfully", carId: id});
        } catch (error) {
        res.status(500).json({message: error.message})
    }
}
exports.updateBook = async (req,res,next) => {
    const { vin_number, car_performance, engine_size, licence_plate, technical_validity, production_time, color, bodytype, fuel, manufacturer, type, idLocation } = req.body;
    try{
        
        return res.status(201).json({ message: "Car updated successfully"});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}