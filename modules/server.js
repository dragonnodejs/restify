'use strict';

/**
 * Initialize the restify server as service
 * @example
    ['server', {
        options: {},
        plugins: (restify, server) => {
            server.use(restify.acceptParser(server.acceptable));
            server.use(restify.authorizationParser());
            server.use(restify.bodyParser({ mapParams: false }));
            server.use(restify.CORS());
            server.use(restify.gzipResponse());
            server.use(restify.queryParser({ mapParams: false }));
        },
        listen: [process.env.PORT]
    }]
 */

module.exports = (config, libraries, services) => {
    let restify = libraries.restify;

    let server = restify.createServer(config.options);
    if (config.plugins) {
        config.plugins(restify, server);
    }
    server.listen.apply(undefined, config.listen);

    services.server = server;
};
