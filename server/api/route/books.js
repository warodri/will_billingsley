const express = require('express');
const router = express.Router();
const Controller = require('../controller/books');

/**
 * Get all books
 */
router.get('/', Controller.get_books);

module.exports = router;
