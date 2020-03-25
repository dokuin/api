'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const server = new ApolloServer({
  schema: typeDefs
});

server
  .listen()
  .then(({ url }) => console.log(`DokuIn API is running at ${url}`));

module.exports = server;
