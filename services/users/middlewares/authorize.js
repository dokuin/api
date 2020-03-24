'use strict';

const createError = require('http-errors');
const { ObjectId } = require('mongoose').Types;

const { User } = require('../models/index');

class Authorization {
  static authorizeUser(req, res, next) {
    const { userId } = req.params;
    const { _id } = req.user;
    User.findById({
      _id: ObjectId(userId)
    })
      .then(user => {
        if (!user) {
          throw createError(404, { message: `User not found!` });
        } else if (user._id !== _id) {
          throw createError(401, { message: `You are not authorized!` });
        }
      })
      .catch(err => {
        next(err);
      });
  }
}

const authorize = Authorization;

module.exports = authorize;
