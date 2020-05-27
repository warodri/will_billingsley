const express = require('express');
const router = express.Router();
const Controller = require('../controller/authors');

/**
 * Get all authors
 */
router.get('/', Controller.get_authors);

module.exports = router;
