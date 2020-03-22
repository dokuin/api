'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, `Project name cannot be empty!`],
  },
  owner: {
    type: String,
    required: [true, `Project owner cannot be empty!`]
  },
  members: {
    type: Array
  },
  documentations: {
    type: Array
  }
});

projectSchema.pre('save', (next) => {
  this.createdAt = new Date();
  next();
});

module.exports = mongoose.model('Projects', projectSchema);
