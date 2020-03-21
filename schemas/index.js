'use strict';

const { mergeSchemas } = require('graphql-tools');

const userSchema = require('./user');
const projectSchema = require('./project');
const documentationSchema = require('./documentation');

const mergedSchemas = mergeSchemas({
  schemas: [userSchema, projectSchema, documentationSchema]
});

module.exports = mergedSchemas;
