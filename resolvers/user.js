'use strict';

const userAPI = require('axios').default.create({
  baseURL: 'http://users:3001/users'
});

const userQueryResolver = {
  users: async () => {
    try {
      const { data } = await userAPI.get('/');
      return data.users;
    } catch (err) {
      return err;
    }
  },
  findOneUser: async (_, { userId }) => {
    try {
      const { data } = await userAPI.get(`/${userId}`);
      return data.user;
    } catch (err) {
      return err;
    }
  }
};

const userMutationResolver = {
  signUp: async (_, args) => {
    try {
      const { fullName, username, profilePicURL, email, password } = args;
      const { data } = await userAPI.post('/signup', {
        fullName,
        username,
        profilePicURL,
        email,
        password
      });
      return data.user;
    } catch (err) {
      return err;
    }
  },
  signIn: async (_, args) => {
    try {
      const { userIdentifier, password } = args;
      const { data } = await userAPI.post('/signin', {
        userIdentifier,
        password
      });
      return data.user;
    } catch (err) {
      return err;
    }
  },
  updateUser: async (_, args) => {
    try {
      const {
        userId,
        token,
        fullName,
        username,
        profilePicURL,
        email,
        password
      } = args;
      const { data } = await userAPI.put(
        `/users/${userId}`,
        {
          fullName,
          username,
          profilePicURL,
          email,
          password
        },
        { headers: { token } }
      );
      return data.user;
    } catch (err) {
      return err;
    }
  },
  deleteUser: async (_, args) => {
    try {
      const { userId, token } = args;
      const { data } = await userAPI.delete(`/${userId}`, {
        headers: { token }
      });
      return data.user;
    } catch (err) {
      return err;
    }
  }
};

module.exports = {
  userQueryResolver,
  userMutationResolver
};
