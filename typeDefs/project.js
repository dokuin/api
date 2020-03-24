'use strict';

const { gql } = require('apollo-server');

const projectTypeDefs = gql`
  type Project {
    projectId: ID
    userId: ID
    name: String
    baseUrl: String
    description: String
    members: [User]
    endpoints: [Endpoint]
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
      baseUrl: String
      description: String
      members: [UserInput]
      endpoints: [EndpointInput]
      token: String
    ): Project
    updateProject(
      projectId: ID
      userId: ID
      name: String
      baseUrl: String
      description: String
      members: [UserInput]
      endpoints: [EndpointInput]
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
