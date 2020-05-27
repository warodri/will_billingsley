/**
 * Model Class for Author
 */
exports.Author = class {
    
    constructor(params) {
        /**
         * Generate a random ID
         */
        const _id = (new Date().getTime()).toString();

        /**
         * Assign as input params
         */
        params['_id'] = _id;

        /**
         * Set this content for global
         * class access
         */
        this.params = params;
    }

    /**
     * Validates user data
     */
    validateInput() {
        /**
         * Get input data from constructor
         */
        const data = this.params;

        /**
         * Simple validation for required fields
         * 
         * TODO: validate if data format is correct.
         */
        if (!data.name) {

            /**
             * Validation failed
             */
            return false;

        } else {

            /**
             * Validation success
             */
            return true;
        }
    }

    /**
     * Returns this class instance
     */
    getAuthor() {
        return this.params
    }

}

