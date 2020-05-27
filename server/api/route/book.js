const express = require('express');
const router = express.Router();
const Controller = require('../controller/books');

/**
 * Get book by id
 */
router.get('/:id', Controller.get_book_by_id);


/**
 * Add new book
 */
router.post('/', Controller.add_new_book);


/**
 * Update information about a book by id
 */
router.put('/:id', Controller.update_book);


/**
 * Delete book by id
 */
router.delete('/:id', Controller.delete_book);


module.exports = router;
