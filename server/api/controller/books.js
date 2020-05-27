const Model = require('../model/book');

/**
 * Gets book by ID
 */
exports.get_book_by_id = async (req, res, next) => {
    try {
        
    } catch( err ) {
        console.log(err.message);
        return res.status(500).json({
            message: err.message
        })        
    }
}


/**
 * Add new book
 */
exports.add_new_book = async (req, res, next) => {
    try {
        /**
         * Create object and validate 
         */
        const book = new Model.Book(req.body)
        const newBook = book.getBook();

        /**
         * Validate input
         */
        if (book.validateInput()) {

            /**
             * Add to my "database"
             */
            req.bookData.push( newBook );

            /**
             * Respond to client
             */
            return res.status(200).json({
                message: 'Data inserted',
                book: newBook
            })        

        } else {

            /**
             * Respond error to client
             */
            return res.status(500).json({
                message: 'Invalid data'
            })        

        }

    } catch( err ) {
        console.log(err.message);
        return res.status(500).json({
            message: err.message
        })        
    }
}


/**
 * Update information about an book by id
 */
exports.update_book = async (req, res, next) => {
    try {
        
    } catch( err ) {
        console.log(err.message);
        return res.status(500).json({
            message: err.message
        })        
    }
}


/**
 * Get all books
 */
exports.get_books = async (req, res, next) => {
    try {
        return res.status(200).json({
            books: req.bookData
        })                
    } catch( err ) {
        console.log(err.message);
        return res.status(500).json({
            message: err.message
        })        
    }
}

