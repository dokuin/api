'use strict';

const { makeExecutableSchema } = require('graphql-tools');

const userTypeDefs = require('./user');
const projectTypeDefs = require('./project');
const documentationTypeDefs = require('./documentation');
const inputTypeDefs = require('./inputs');

const { userQueryResolver, userMutationResolver } = require('../resolvers/user');
const { projectQueryResolver, projectMutationResolver } = require('../resolvers/project');
const { documentationQueryResolver, documentationMutationResolver } = require('../resolvers/documentation');

const resolvers = {
  Query: {
    ...userQueryResolver,
    ...projectQueryResolver,
    ...documentationQueryResolver
  },
  Mutation: {
    ...userMutationResolver,
    ...projectMutationResolver,
    ...documentationMutationResolver
  }
};

const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs, projectTypeDefs, documentationTypeDefs, inputTypeDefs],
  resolvers
});

module.exports = schema;
