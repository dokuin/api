'use strict';

const { gql } = require('apollo-server');

const endpointTypeDefs = gql`
  type Endpoint {
    projectId: ID
    method: String
    path: String
    description: String
    Headers: Object
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
`;

module.exports = endpointTypeDefs;
