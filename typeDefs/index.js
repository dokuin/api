'use strict';

const { makeExecutableSchema } = require('graphql-tools');

const userTypeDefs = require('./user');
const projectTypeDefs = require('./project');
const inputTypeDefs = require('./inputs');
const endpointTypeDefs = require('./endpoint');

const { ObjectScalarType } = require('./scalars');

const {
  userQueryResolver,
  userMutationResolver
} = require('../resolvers/user');
const {
  projectQueryResolver,
  projectMutationResolver
} = require('../resolvers/project');

const {
  endpointQueryResolver,
  endpointMutationResolver
} = require('../resolvers/endpoint');

const resolvers = {
  Query: {
    ...userQueryResolver,
    ...projectQueryResolver,
    ...endpointQueryResolver
  },
  Mutation: {
    ...userMutationResolver,
    ...projectMutationResolver,
    ...endpointMutationResolver
  },
  Object: ObjectScalarType
};

const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs, projectTypeDefs, inputTypeDefs, endpointTypeDefs],
  resolvers
});

module.exports = schema;
