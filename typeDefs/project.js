'use strict';

const { gql } = require('apollo-server');

const projectTypeDefs = gql`
  type Project {
    projectId: ID
    ownerId: ID
    name: String
    baseUrl: String
    description: String
    members: [User]
    endpoints: [Endpoint]
  }

  extend type Query {
    projects(ownerId: ID): [Project]
    findOneProject(
      ownerId: ID
      projectId: ID
    ): Project
  }

  extend type Mutation {
    createProject(
      ownerId: ID
      name: String
      baseUrl: String
      description: String
      members: [UserInput]
      endpoints: [EndpointInput]
      token: String
    ): Project
    updateProject(
      projectId: ID
      ownerId: ID
      name: String
      baseUrl: String
      description: String
      members: [UserInput]
      endpoints: [EndpointInput]
      token: String
    ): Project
    deleteProject(
      ownerId: ID
      projectId: ID
      token: String
    ): Project
  }
`;

module.exports = projectTypeDefs;
