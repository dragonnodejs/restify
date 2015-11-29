'use strict';

/**
 * Serves the package information for the application
 * @example
    ['package', require(__dirname + '/package.json')]
 */

module.exports = (config, libraries, services) => {
    let server = services.server;

    server.get('/', (req, res) => {
        res.send({ name: config.name, version: config.version, homepage: config.homepage });
    });
};
