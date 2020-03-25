'use strict';

const projectAPI = require('axios').default.create({
  baseURL: 'http://projects:3002/projects'
});

const projectQueryResolver = {
  projects: async (_, args) => {
    try {
      const { ownerId } = args;
      const { data } = await projectAPI.get(`/${ownerId}`);
      return data.projects;
    } catch (err) {
      return err;
    }
  },
  findOneProject: async (_, args) => {
    try {
      const { ownerId, projectId } = args;
      const { data } = await projectAPI.get(`/${ownerId}/${projectId}`);
      return data.project;
    } catch (err) {
      return err;
    }
  }
};

const projectMutationResolver = {
  createProject: async (_, args) => {
    try {
      const { name, ownerId, baseUrl, description, members, endpoints, token } = args;
      const { data } = await projectAPI.post(
        `/${ownerId}`,
        {
          name,
          baseUrl,
          description,
          owner,
          members,
          endpoints
        },
        { headers: { token } }
      );
      return data.project;
    } catch (err) {
      return err;
    }
  },
  updateProject: async (_, args) => {
    try {
      const {
        projectId,
        ownerId,
        name,
        baseUrl,
        description,
        members,
        endpoints,
        token
      } = args;
      const { data } = await projectAPI.put(
        `/${ownerId}/${projectId}`,
        {
          name,
          baseUrl,
          description,
          owner,
          members,
          endpoints
        },
        { headers: { token } }
      );
      return data.project;
    } catch (err) {
      return err;
    }
  },
  deleteProject: async (_, args) => {
    try {
      const { ownerId, projectId, token } = args;
      const { data } = await projectAPI.delete(`/${ownerId}/${projectId}`, {
        headers: { token }
      });
      return data.project;
    } catch (err) {
      return err;
    }
  }
};

module.exports = {
  projectQueryResolver,
  projectMutationResolver
};
