'use strict';

/**
 * Services for validate input from the client
 * @example
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
 */

module.exports = (config, libraries, services) => {
    let errors = services.errors,
        validator = libraries.validator;

    let validators = {};
    for (let validation of config(validator, errors)) {
        validators[validation[0]] = (source, name) => (req, res, next) => {
            try {
                req[source][name] = validation[1](req[source][name]);
                next();
            } catch (err) {
                res.send(err);
            }
        };
    }

    services.validators = validators;
};
