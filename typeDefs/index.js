'use strict';

const { makeExecutableSchema } = require('graphql-tools');

const userTypeDefs = require('./user');
const projectTypeDefs = require('./project');
const inputTypeDefs = require('./inputs');
const endpointTypeDefs = require('./endpoint');

const {
  userQueryResolver,
  userMutationResolver
} = require('../resolvers/user');
const {
  projectQueryResolver,
  projectMutationResolver
} = require('../resolvers/project');

const resolvers = {
  Query: {
    ...userQueryResolver,
    ...projectQueryResolver
  },
  Mutation: {
    ...userMutationResolver,
    ...projectMutationResolver
  }
};

const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs, projectTypeDefs, inputTypeDefs, endpointTypeDefs],
  resolvers
});

module.exports = schema;
