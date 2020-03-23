'use strict';

const { gql } = require('apollo-server');

const projectTypeDefs = gql`
  type Project {
    projectId: ID
    userId: ID
    name: String
    owner: String
    members: [User]
    documentations: [Documentation]
  }

  extend type Query {
    projects(userId: ID): [Project]
    findOneProject(
      userId: ID
      projectId: ID
    ): Project
  }

  extend type Mutation {
    createProject(
      userId: ID
      name: String
      owner: String
      members: [UserInput]
      documentations: [DocumentationInput]
      token: String
    ): Project
    updateProject(
      projectId: ID
      userId: ID
      name: String
      owner: String
      members: [UserInput]
      documentations: [DocumentationInput]
      token: String
    ): Project
    deleteProject(
      userId: ID
      projectId: ID
      token: String
    ): Project
  }
`;

module.exports = projectTypeDefs;
