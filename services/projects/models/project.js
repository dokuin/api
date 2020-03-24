'use strict';

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, `Project name cannot be empty!`],
  },
  ownerId: {
    type: ObjectId,
    required: [true, `Project owner cannot be empty!`]
  },
  baseUrl: {
    type: String,
    require: [true, 'Base Url cannot be empty!']
  },
  description: {
    type: String
  },
  members: {
    type: Array
  },
  endpoints: {
    type: Array
  }
});

projectSchema.pre('save', (next) => {
  this.createdAt = new Date();
  next();
});

module.exports = mongoose.model('Projects', projectSchema);
