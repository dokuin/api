'use strict';

const { gql } = require('apollo-server');

const inputTypeDefs = gql`
  input UserInput {
    userId: ID
    fullName: String
    username: String
    profilePicURL: String
    email: String
  }

  input DocumentationInput {
    userId: ID
    documentationId: ID
    name: String
    owner: String
    rawContent: String
    type: String
  }

  input EndpointInput {
    projectId: ID
    method: String
    path: String
    description: String
    headers: [String]
    queryParams: [String]
    body: [String]
  }
`;

module.exports = inputTypeDefs;
