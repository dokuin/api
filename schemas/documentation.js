'use strict';

const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');

const {
  documentationQueryResolver,
  documentationMutationResolver
} = require('../resolvers/documentation');

const documentationSchema = makeExecutableSchema({
  typeDefs: gql`
    type Documentation {
      userId: ID
      documentationId: ID
      name: String
      owner: String
      rawContent: String
      type: String
      endpoints: [Endpoint]
    }

    type Query {
      documentations(userId: ID): [Documentation]
      findOneDocumentation(
        userId: ID 
        documentationId: ID
      ): Documentation
    }

    type Mutation {
      createDocumentation(
        userId: ID
        token: String
        name: String
        owner: String
        rawContent: String
        type: String
        endpoints: [Endpoint]
      ): Documentation
      updateDocumentation(
        userId: ID
        documentationId: ID
        token: String
        name: String
        owner: String
        rawContent: String
        type: String
        endpoints: [Endpoint]
      ): Documentation
      deleteDocumentation(
        userId: ID
        documentationId: ID
        token: String
      ): Documentation
    }
  `,
  resolvers: {
    Query: documentationQueryResolver,
    Mutation: documentationMutationResolver
  }
});

module.exports = documentationSchema;
