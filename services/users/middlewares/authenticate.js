'use strict';

const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  try {
    const {token} = req.headers;
    req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authenticate;
