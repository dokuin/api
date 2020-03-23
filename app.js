'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { ApolloServer } = require('apollo-server');
const mergedSchemas = require('./schemas');
const server = new ApolloServer({
  schema: mergedSchemas
});

server
  .listen()
  .then(({ url }) => console.log(`DokuIn API is running at ${url}`));
