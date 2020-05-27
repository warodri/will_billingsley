const Model = require('../model/author');

/**
 * Gets author by ID
 */
exports.get_author_by_id = async (req, res, next) => {
    try {
        /**
         * Get input data
         */
        const authorId = req.params.id;

        /**
         * Validate input data
         */
        if (!authorId) {
            return res.status(500).json({
                message: 'Invalid author ID'
            })            
        }

        /**
         * Find the record we want
         */
        const author = req.authorData.find( b => b._id == authorId );

        /**
         * Respond
         */
        return res.status(200).json({
            author
        })    
    } catch( err ) {
        console.log(err.message);
        return res.status(500).json({
            message: err.message
        })        
    }
}


/**
 * Add new author
 */
exports.add_new_author = async (req, res, next) => {
    try {
        /**
         * Create object and validate 
         */
        const author = new Model.Author(req.body)
        const newAuthor = author.getAuthor();

        /**
         * Validate input
         */
        if (author.validateInput()) {

            /**
             * Add to my "database"
             */
            req.authorData.push( newAuthor );

            /**
             * Respond to client
             */
            return res.status(200).json({
                message: 'Data inserted',
                author: newAuthor
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
 * Update information about an author by id
 */
exports.update_author = async (req, res, next) => {
    try {
        /**
         * Get the ID of the author 
         * we want to update
         */
        const authorId = req.params.id;

        /**
         * Validate input
         */
        if (!authorId) {
            return res.status(404).json({
                message: 'Invalid author ID'
            })                        
        }

        /**
         * Find the author
         */
        const author = req.authorData.find( b => b._id === authorId );

        /**
         * Respond error if author was not found
         */
        if (!author) {
            return res.status(404).json({
                message: 'Author not found'
            })     
        }

        /**
         * Update author data
         */
        Object.assign( author, req.body );

        /**
         * Respond to client
         */
        return res.status(200).json({
            message: 'Author updated',
            author: author
        })  
        
    } catch( err ) {
        console.log(err.message);
        return res.status(500).json({
            message: err.message
        })        
    }
}



/**
 * Delete a author by id
 */
exports.delete_author = async (req, res, next) => {
    try {
        /**
         * Get the ID of the author 
         * we want to delete
         */
        const authorId = req.params.id;

        /**
         * Validate input
         */
        if (!authorId) {
            return res.status(404).json({
                message: 'Invalid author ID'
            })                        
        }

        /**
         * Delete this author
         */
        for (let i=0; i < req.authorData.length; i++) {
            if (req.authorData[ i ]._id === authorId) {
                req.authorData.splice(i, 1);
                break;
            }
        }
        
        /**
         * Respond to client
         */
        return res.status(200).json({
            message: 'Author removed'
        })  
        
    } catch( err ) {
        console.log(err.message);
        return res.status(500).json({
            message: err.message
        })        
    }
}



/**
 * Get all authors
 */
exports.get_authors = async (req, res, next) => {
    try {
        return res.status(200).json({
            authors: req.authorData
        })                
    } catch( err ) {
        console.log(err.message);
        return res.status(500).json({
            message: err.message
        })        
    }
}

