'use strict'

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Schema = mongoose.Schema;

const endpointSchema = new Schema({
  projectId: {
    type: ObjectId,
    required: [true, 'Project id cannot be empty!']
  },
  method: {
    type: String,
    required: [true, 'HTTP Method cannot be empty!']
  },
  path: {
    type: String,
    required: [true, 'Path cannot be empty!']
  },
  description: {
    type: String
  },
  headers: {
    type: Array
  },
  queryParams: {
    type: Array
  },
  body: {
    type: Array
  },
  response: {
    type: Array
  },
  errorResponse: {
    type: Array
  }
})

module.exports = mongoose.model('Endpoint', endpointSchema)