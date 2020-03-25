'use strict';

const endpointAPI = require('axios').default.create({
  baseURL: `http://projects:3002/endpoints`
});

const endpointQueryResolver = {
  endpoints: async (_, args) => {
    try {
      const { projectId } = args;
      const { data } = await endpointAPI.get(`/${projectId}`);
      return data.endpoints;
    } catch (err) {
      return err;
    }
  },
  findOneEndpoint: async (_, args) => {
    try {
      const { projectId, endpointId } = args;
      const { data } = await endpointAPI.get(`/${projectId}/${endpointId}`);
      return data.endpoint;
    } catch (err) {
      return err;
    }
  }
};

const endpointMutationResolver = {
  createEndpoint: async (_, args) => {
    try {
      const {
        token,
        projectId,
        method,
        path,
        description,
        headers,
        queryParams,
        body
      } = args;
      const { data } = await endpointAPI.post(
        `/${projectId}`,
        { method, path, description, headers, queryParams, body },
        { headers: { token } }
      );
      return data.endpoint;
    } catch (err) {
      return err;
    }
  },
  updateEndpoint: async (_, args) => {
    try {
      const {
        token,
        projectId,
        endpointId,
        method,
        path,
        description,
        headers,
        queryParams,
        body
      } = args;
      const { data } = await endpointAPI.put(
        `/${projectId}/${endpointId}`,
        { method, path, description, headers, queryParams, body },
        { headers: { token } }
      );
      return data.endpoint;
    } catch (err) {
      return err;
    }
  },
  deleteEndpoint: async (_, args) => {
    try {
      const { token, projectId, endpointId } = args;
      const { data } = await endpointAPI.delete(
        `/${projectId}/${endpointId}`,
        {
          headers: { token }
        }
      );
      return data.endpoint;
    } catch (err) {
      return err;
    }
  }
};

module.exports = {
  endpointQueryResolver,
  endpointMutationResolver
};
