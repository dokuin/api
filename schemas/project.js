'use strict';

const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');

const {
  projectQueryResolver,
  projectMutationResolver
} = require('../resolvers/project');

const projectSchema = makeExecutableSchema({
  typeDefs: gql`
    type Project {
      projectId: ID
      userId: ID
      name: String
      owner: String
      members: Array 
      documentations: Array
    }

    type Query {
      projects(userId: ID): [Project]
      findOneProject(
        userId: ID
        projectId: ID
      ): Project
    }

    type Mutation {
      createProject(
        userId: ID 
        name: String 
        owner: String 
        members: Array
        documentations: Array
        token: String
      ): Project
      updateProject(
        projectId: ID
        userId: ID
        name: String
        owner: String
        members: Array
        documentations: Array
        token: String
      ): Project
      deleteProject(
        userId: ID 
        projectId: ID 
        token: String
      ): Project
    }
  `,
  resolvers: {
    Query: projectQueryResolver,
    Mutation: projectMutationResolver
  }
});

module.exports = projectSchema;
