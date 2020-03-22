'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentationSchema = new Schema({
  userId: {
    type: ObjectId
  },
  name: {
    type: String,
    required: [true, `Documentation name cannot be empty!`]
  }, 
  owner: {
    type: String,
    required: [true, `Documentation owner cannot be empty!`]
  }, 
  rawContent: {
    type: String
  }, 
  type: {
    type: String,
    required: [true, `Documentation type cannot be empty!`]
  }, 
  endpoints: {
    type: Array
  }
});

documentationSchema.pre('save', (next) => {
  this.createdAt = new Date();
  next();
});

module.exports = mongoose.model('Documentations', documentationSchema);
