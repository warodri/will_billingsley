/**
 * Model Class for Book
 */
exports.Book = class {
    

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
        if (!data.title || !data.isbn || !data.pageCount || 
            !data.publishedDate || !data.thumbnailUrl || 
            !data.shortDescription || !data.status || 
            !data.authors || !data.categories) {

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
    getBook() {
        return this.params
    }


}

