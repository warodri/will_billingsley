const https = require('https');
const http = require('http');
const app = require('./app');
const fs = require('fs');

/**
 * Read server configuration variables
 */
const config = require('./config');

console.log('Starting ' + config.ENV + ' server on port ' + config.PORT);

if (config.ENV === config.ENV_DEV) {
        
    /**
     * Create local server
     */
    const server = http.createServer(app);

    /**
     * Start local server
     */
    server.listen( config.PORT );

} else {

    /**
     * Create production server
     */
    const options = {
        key: fs.readFileSync('/path/to/privkey.pem'),
        cert: fs.readFileSync('/path/to/fullchain.pem')
    };    
    const server = https.createServer(options, app);

    /**
     * Start production server
     */
    server.listen( config.PORT );    

}


