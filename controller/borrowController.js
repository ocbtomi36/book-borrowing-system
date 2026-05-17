const Borrow = require('../model/borrowModel');

exports.insertBorrow = async (req,res,next) => {
    const userId = req.iduser;
    const borrowDate = Date.now();
    const {BookIdBook, due_date } = req.body;
    console.log(BookIdBook);
    try {
        const insertBorrow = await Borrow.create({
            UserIdUser: userId,
            BookIdBook: BookIdBook,
            borrow_date: borrowDate,
            due_date: due_date
        });
        return res.status(201).json({
            message: 'Borrow created successfully'});
    } catch (error) {
         return res.status(500).json({ message: error.message });
    }

}