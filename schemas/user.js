'use strict';

const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');

const {
  userQueryResolver,
  userMutationResolver
} = require('../resolvers/user');

const userSchema = makeExecutableSchema({
  typeDefs: gql`
    type User {
      userId: ID
      fullName: String
      username: String
      profilePicURL: String
      email: String
    }

    type Query {
      users: [User]
      findOneUser(userId: ID): User
    }

    type Mutation {
      signUp(
        fullName: String
        username: String
        profilePicURL: String
        email: String
        password: String
      ): User
      signIn(
        email: String
        password: String
      ) : User
      updateUser(
        userId: ID
        token: String
        fullName: String
        username: String
        profilePicURL: String
        email: String
        password: String
      ): User
      deleteUser(
        userId: ID
        token: String
      ): User
    }
  `,
  resolvers: {
    Query: userQueryResolver,
    Mutation: userMutationResolver
  }
});

module.exports = userSchema;
