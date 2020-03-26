'use strict';

const jwt = require('jsonwebtoken');
const createError = require('http-errors');

function authenticate(req, res, next) {
  try {
    const {token} = req.headers;
    req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (err) {
    next(createError(401, {name: err.name, message: 'Invalid token!'}));
  }
}

module.exports = authenticate;
