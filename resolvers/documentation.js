'use strict';

const documentationAPI = require('axios').default.create({
  baseURL: 'http://localhost:3003/documentations'
});

const documentationQueryResolver = {
  documentations: async (_, args) => {
    try {
      const { userId } = args;
      const { data } = await documentationAPI.get(`/${userId}`);
      return data.documentations;
    } catch (err) {
      return err;
    }
  },
  findOneDocumentation: async (_, args) => {
    try {
      const { userId, documentationId } = args;
      const { data } = await documentationAPI.get(
        `/${userId}/${documentationId}`
      );
      return data.documentation;
    } catch (err) {
      return err;
    }
  }
};

const documentationMutationResolver = {
  createDocumentation: async (_, args) => {
    try {
      const { userId, token, name, owner, rawContent, type, endpoints } = args;
      const { data } = await documentationAPI.post(
        `/${userId}`,
        { name, owner, rawContent, type, endpoints },
        { headers: { token } }
      );
      return data.documentation;
    } catch (err) {
      return err;
    }
  },
  updateDocumentation: async (_, args) => {
    try {
      const {
        userId,
        documentationId,
        token,
        name,
        owner,
        rawContent,
        type,
        endpoints
      } = args;
      const { data } = await documentationAPI.put(
        `/${userId}/${documentationId}`,
        { name, owner, rawContent, type, endpoints },
        { headers: { token } }
      );
      return data.documentation;
    } catch (err) {
      return err;
    }
  },
  deleteDocumentation: async (_, args) => {
    try {
      const { userId, documentationId, token } = args;
      const { data } = await documentationAPI.delete(
        `/${userId}/${documentationId}`,
        {
          headers: { token }
        }
      );
      return data.documentation;
    } catch (err) {
      return err;
    }
  }
};

module.exports = {
  documentationQueryResolver,
  documentationMutationResolver
};
