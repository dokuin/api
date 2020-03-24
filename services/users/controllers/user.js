'use strict';

const { User } = require('../models');
const { ObjectId } = require('mongoose').Types;
const jwt = require('jsonwebtoken');
const encrypt = require('bcryptjs');
const createError = require('http-errors');

class UserController {
  static signUp(req, res, next) {
    const { fullName, username, profilePicURL, email, password } = req.body;
    User.create({ fullName, username, profilePicURL, email, password })
      .then(user => {
        res.status(201).json({ user });
      })
      .catch(err => {
        console.log(err)
        next(err);
      });
  }

  static signIn(req, res, next) {
    const { userIdentifier, password } = req.body;
    User.findOne({
      $or: [
        { email: userIdentifier },
        { username: userIdentifier },
      ]
    })
    .then(user => {
      if(user){
        const { _id, email, username } = user
        if(encrypt.compareSync(password, user.password)){
          const users = {
            _id,
            email,
            username
          }
          const token = jwt.sign(users, process.env.JWT_SECRET_KEY)
          res.status(200).json({
            token,
            user: users
          })
        }else{
          throw createError(403, { message: 'Username or password is wrong!' })
        }
      }else{
        throw createError(403, { message: 'Email doesnt exist!' })
      }
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
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
