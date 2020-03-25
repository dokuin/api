'use strict';

const { gql } = require('apollo-server');

const endpointTypeDefs = gql`
  scalar Object

  type Endpoint {
    projectId: ID
    method: String
    path: String
    description: String
    headers: Object
    queryParams: Object
    body: Object
    response: Response
    errorResponse: [ErrorResponse]
  }

  type Response {
    description: String
    status: Int
    statusText: String
    headers: Object
    body: Object
  }

  type ErrorResponse {
    description: String
    status: Int
    statusText: String
    headers: Object
    body: Object
  }

  extend type Query {
    endpoints: [Endpoint]
    findOneEndpoint: Endpoint
  }

  extend type Mutation {
    createEndpoint(
    token: String
    projectId: ID
    method: String
    path: String
    description: String
    headers: Object
    queryParams: Object
    body: Object
    ) : Endpoint

    updateEndpoint(
      token: String
        projectId: ID
        endpointId: ID
        method: String
        path: String
        description: String
        headers: Object
        queryParams: Object
        body: Object
    ) : Endpoint

    deleteEndpoint(
      token: String
      projectId: ID
      endpointId: ID
    ) : Endpoint
  }
`;

module.exports = endpointTypeDefs;
