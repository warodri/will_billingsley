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
 * Update information about a abook by id
 */
router.post('/:id', Controller.update_book);


module.exports = router;
