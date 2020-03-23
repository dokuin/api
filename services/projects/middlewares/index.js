'use strict';

const authenticate = require('./authenticate');
const authorize = require('./authorize');
const errorHandler = require('./errorHandler');

module.exports = {
  authenticate,
  authorize,
  errorHandler
};
