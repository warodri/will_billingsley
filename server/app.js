/**
 * I use EXPRESS for this server
 */
const express = require('express');

/**
 * Create the app
 */
const app = express();

/**
 * Morgan in case I want to upload files
 */
const morgan = require('morgan');

/**
 * Parse input from client
 */
const bodyParser = require('body-parser');

/**
 * My config file
 */
const config = require('./config');


/**
 * Minify the output code to get less transfer
 */
var minifyHTML = require('express-minify-html');
app.use(minifyHTML({
    override:      true,
    exception_url: false,
    htmlMinifier: {
        removeComments:             true,
        collapseWhitespace:         true,
        collapseBooleanAttributes:  true,
        removeAttributeQuotes:      true,
        removeEmptyAttributes:      true,
    }
}));


/**
 * Load the code used to run our routes
 */
const indexRoutes = require('./api/route/index');
const bookRoutes = require('./api/route/book');
const authorRoutes = require('./api/route/author');


/**
 * Setup Morgan for file uploading
 * Define our upload folder
 */
app.use(morgan('dev'));
app.use('./public/uploads', express.static('uploads'));


/**
 * Setup Body parser
 */
app.use(bodyParser.urlencoded({ 
    extended: true 
}));
app.use(bodyParser.json());


/**
 * Setup CORS to enable requests from clients
 */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Max-Age", "1000000000");
    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    } else {
        next();
    }
});


/**
 * Define the public folder I will use 
 */
app.use(express.static('./public'));


/**
 * I'm using EJS for templates.
 */
app.set('view engine', 'ejs');


/**
 * Let's set some basic values to 
 * ALL the routes, using this middleware
 */
app.use((req, res, next) => {
    try {
        req.SERVER = config.SERVER;
        req.API = config.ENDPOINT;        
        req.ENDPOINT = config.ENDPOINT;        
        next();
    } catch (err) {
        console.log(err.message)
        next();
    }
})


/**
 * Let's define our routes
 */
app.use('/', indexRoutes);
app.use('/book', bookRoutes);
app.use('/author', authorRoutes);


module.exports = app;
