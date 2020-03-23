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
`;

module.exports = inputTypeDefs;
