'use strict';

const { User } = require('../models');
const { ObjectId } = require('mongoose').Types;

class UserController {
  static signUp(req, res, next) {
    const { fullName, username, profilePicURL, email, password } = req.body;
    User.create({ fullName, username, profilePicURL, email, password })
      .then(user => {
        res.status(201).json({ user });
      })
      .catch(err => {
        next(err);
      });
  }

  static signIn(req, res, next) {
    
  }

  static findAll(req, res, next) {
    User.find()
      .then(users => {
        res.status(200).json({ users });
      })
      .catch(err => {
        next(err);
      });
  }

  static findOne(req, res, next) {
    User.find({
      _id: ObjectId(req.params.userId)
    })
      .then(user => {
        res.status(200).json({ user });
      })
      .catch(err => {
        next(err);
      });
  }

  static update(req, res, next) {
    const { fullName, username, profilePicURL, email, password } = req.body;
    User.findByIdAndUpdate(
      { _id: ObjectId(req.params.userId) },
      { fullName, username, profilePicURL, email, password }
    )
      .then(user => {
        res.status(200).json({ user });
      })
      .catch(err => {
        next(err);
      });
  }

  static delete(req, res, next) {
    User.findByIdAndDelete({ _id: ObjectId(req.params.userId) })
      .then(user => {
        res.status(200).json({ user });
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = UserController;
