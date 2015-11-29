# DragonNode.js Restify
Bundle with services to develop RestAPI server applications with restify
- Make the restify errors as service available
- Initialize the restify server as service
- Serves the package information for the application
- Services for validate input from the client

## Installation
- Run ```npm install dragonnodejs-restify --save```
- Add the bundle to the "app.js":
```javascript
let modules = [
    [require('dragonnodejs-restify'), [
        ['errors'],
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
        }],
        ['package', require(__dirname + '/package.json')],
        ['validators', (validator, errors) => [
            ['email', input => {
                input = validator.trim(input);
                if (!validator.isEmail(input)) {
                    throw new errors.BadRequestError('invalid email');
                }
                return input;
            }],
            ['password', input => validator.trim(input)]
        ]]
    ]]
];
```
