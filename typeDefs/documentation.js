'use strict';

const { gql } = require('apollo-server');

const documentationTypeDefs = gql`
  type Documentation {
    userId: ID
    documentationId: ID
    name: String
    owner: String
    rawContent: String
    type: String
  }

  extend type Query {
    documentations(userId: ID): [Documentation]
    findOneDocumentation(
      userId: ID 
      documentationId: ID
    ): Documentation
  }

  extend type Mutation {
    createDocumentation(
      userId: ID
      token: String
      name: String
      owner: String
      rawContent: String
      type: String
    ): Documentation
    updateDocumentation(
      userId: ID
      documentationId: ID
      token: String
      name: String
      owner: String
      rawContent: String
      type: String
    ): Documentation
    deleteDocumentation(
      userId: ID
      documentationId: ID
      token: String
    ): Documentation
  }
`

module.exports = documentationTypeDefs;
