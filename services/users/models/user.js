'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const encrypt = require('bcryptjs');

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, `Full name cannot be empty!`]
  },
  username: {
    type: String,
    required: [true, `Username cannot be empty!.`]
  },
  profilePicURL: {
    type: String
  },
  email: {
    type: String,
    required: [true, `Email cannot be empty!`],
    validate: {
      validator: email => {
        const emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailFormat.test(email)) {
          return false;
        }
      }
    }
  },
  password: {
    type: String,
    required: [true, `Password cannot be empty!`],
    minlength: [6, `Password min. 6 characters.`]
  }
});

userSchema.pre('save', function(next) {
  this.password = encrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model('Users', userSchema);
