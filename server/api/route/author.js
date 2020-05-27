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
router.post('/:id', Controller.update_author);


module.exports = router;
