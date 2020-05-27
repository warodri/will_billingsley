const express = require('express');
const router = express.Router();
const Controller = require('../controller/authors');

/**
 * Get author by id
 */
router.get('/:id', Controller.get_author_by_id);


/**
 * Add new author
 */
router.post('/', Controller.add_new_author);


/**
 * Update information about an author by id
 */
router.put('/:id', Controller.update_author);


/**
 * Delete author by id
 */
router.delete('/:id', Controller.delete_author);


module.exports = router;
