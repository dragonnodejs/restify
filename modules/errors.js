'use strict';

/**
 * Make the restify errors as service available
 * @example
    ['errors']
 */

module.exports = (config, libraries, services) => {
    services.errors = libraries.restify.errors;
};
