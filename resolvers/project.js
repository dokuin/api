'use strict';

const projectAPI = require('axios').default.create({
  baseURL: 'http://localhost:3002/projects'
});

const projectQueryResolver = {
  projects: async (_, args) => {
    try {
      const { userId } = args;
      const { data } = await projectAPI.get(`/${userId}`);
      return data.projects;
    } catch (err) {
      return err;
    }
  },
  findOneProject: async (_, args) => {
    try {
      const { userId, projectId } = args;
      const { data } = await projectAPI.get(`/${userId}/${projectId}`);
      return data.project;
    } catch (err) {
      return err;
    }
  }
};

const projectMutationResolver = {
  createProject: async (_, args) => {
    try {
      const { userId, name, owner, members, documentations, token } = args;
      const { data } = await projectAPI.post(
        `/${userId}`,
        {
          name,
          owner,
          members,
          documentations
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
        userId,
        name,
        owner,
        members,
        documentations,
        token
      } = args;
      const { data } = await projectAPI.put(
        `/${userId}/${projectId}`,
        {
          name,
          owner,
          members,
          documentations
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
      const { userId, projectId, token } = args;
      const { data } = await projectAPI.delete(`/${userId}/${projectId}`, {
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
