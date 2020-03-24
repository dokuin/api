'use strict';

const jwt = require('jsonwebtoken');
const createError = require('http-errors');

function authenticate(req, res, next) {
  try {
    const {token} = req.headers;
    req.user = jwt.verify(token, 'DokuinJs');
    next();
  } catch (err) {
    next(createError(403, { name: 'AuthenticationFailed', message: 'Authentication Failed' }));
  }
}

module.exports = authenticate;
