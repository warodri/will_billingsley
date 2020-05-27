const Model = require('../model/book');

/**
 * Gets book by ID
 */
exports.get_book_by_id = async (req, res, next) => {
    try {
        /**
         * Get input data
         */
        const bookId = req.params.id;

        /**
         * Validate input data
         */
        if (!bookId) {
            return res.status(500).json({
                message: 'Invalid book ID'
            })            
        }

        /**
         * Find the record we want
         */
        const book = req.bookData.find( b => b._id == bookId );

        /**
         * Respond
         */
        return res.status(200).json({
            book
        })        

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
        /**
         * Get the ID of the book 
         * we want to update
         */
        const bookId = req.params.id;

        /**
         * Validate input
         */
        if (!bookId) {
            return res.status(404).json({
                message: 'Invalid book ID'
            })                        
        }

        /**
         * Find the book
         */
        const book = req.bookData.find( b => b._id === bookId );

        /**
         * Respond error if book was not found
         */
        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            })     
        }

        /**
         * Update book data
         */
        Object.assign( book, req.body );

        /**
         * Respond to client
         */
        return res.status(200).json({
            message: 'Book updated',
            book: book
        })  
        
    } catch( err ) {
        console.log(err.message);
        return res.status(500).json({
            message: err.message
        })        
    }
}



/**
 * Delete a book by id
 */
exports.delete_book = async (req, res, next) => {
    try {
        /**
         * Get the ID of the book 
         * we want to delete
         */
        const bookId = req.params.id;

        /**
         * Validate input
         */
        if (!bookId) {
            return res.status(404).json({
                message: 'Invalid book ID'
            })                        
        }

        /**
         * Delete this book
         */
        for (let i=0; i < req.bookData.length; i++) {
            if (req.bookData[ i ]._id === bookId) {
                req.bookData.splice(i, 1);
                break;
            }
        }
        
        /**
         * Respond to client
         */
        return res.status(200).json({
            message: 'Book removed'
        })  
        
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

