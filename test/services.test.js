const userApp = require('../services/users/app');
const userAPI = require('supertest')(userApp);

const projectApp = require('../services/projects/app');
const projectAPI = require('supertest')(projectApp);

let mongoose = require('mongoose');

let token;
let userId;
let ownerId;
let projectId;
let endpointId;

const wrongToken = `this is wrong token`;

describe(`User API Test`, () => {
  it('Should return an ID and User data (User Sign Up).', async () => {
    const signUpData = {
      fullName: 'John Doe',
      username: 'john',
      profilePicURL: 'https://something',
      email: 'john@doe.com',
      password: 'johndone'
    };
    const res = await userAPI.post('/users/signup').send(signUpData);
    const user = res.body.user;
    expect(user).toHaveProperty('_id');
    userId = user._id;
  });

  it(`Should return 'Full name cannot be empty!' message (User Sign Up).`, async () => {
    const signUpData = {
      fullName: '',
      username: 'john',
      profilePicURL: 'https://something',
      email: 'john@doe.com',
      password: 'johndone'
    };
    const res = await userAPI.post('/users/signup').send(signUpData);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message.fullName.message).toBe(
      'Full name cannot be empty!'
    );
  });

  it('Should return JWT token and User data (User Sign In).', async () => {
    const signInData = {
      userIdentifier: 'john@doe.com',
      password: 'johndone'
    };
    const res = await userAPI.post('/users/signin').send(signInData);
    const user = res.body.user;
    expect(user).toHaveProperty('_id');
    expect(res.body).toHaveProperty('token');
    userId = user._id;
    ownerId = user._id;
    token = res.body.token;
    console.log(token);
  });

  it(`Should return 'Invalid username or password!' message. (User Sign In)`, async () => {
    const signInData = {
      userIdentifier: 'john@doe.com',
      password: 'doejohn'
    };
    const res = await userAPI.post('/users/signin').send(signInData);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Invalid username or password!');
  });

  it(`Should return 'Invalid token!' message (User Update)`, async () => {
    const updateUserData = {
      fullName: 'John Doe',
      username: 'john',
      profilePicURL: 'https://something',
      email: 'john@doe.com',
      password: 'johndone'
    };
    const res = await userAPI
      .put(`/users/${userId}`)
      .send(updateUserData)
      .set('token', wrongToken);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Invalid token!');
  });

  it(`Should return User data (User Update).`, async () => {
    const updateUserData = {
      fullName: 'Adam Jackson',
      username: 'adamjack',
      profilePicURL: 'https//:something',
      email: 'adam@jack.com',
      password: 'adamzzz'
    };
    const res = await userAPI
      .put(`/users/${userId}`)
      .send(updateUserData)
      .set('token', token);
    const user = res.body.user;
    expect(user).toHaveProperty('_id');
    expect(Object.keys(user).length).toBe(7);
  });

  // it(`Should return 'Unauthorized!' message (User Delete).`, async () => {
  //   const res = await userAPI.delete(`/users/${userId}`).set('token', wrongToken);
  //   const user = res.body.user;
  //   expect(user).toHaveProperty('message');
  //   expect(user.message).toBe('Unauthorized!');
  // });

  // it(`Should return User data (User Delete)`, async () => {
  //   const res = await userAPI.delete(`/users/${userId}`).set('token', token);
  //   const user = res.body.user;
  //   expect(user).toHaveProperty('_id');
  //   expect(Object.keys(user).length).toBe(6);
  // });
});

describe('Project API Test', () => {
  it('Should return all available projects (Find All Projects).', async () => {
    const res = await projectAPI
      .get(`/projects/${ownerId}`)
      .set('token', token);
    const projects = res.body.projects;
    expect(Array.isArray(projects)).toBe(true);
    if (projects.length > 0) {
      projects.forEach(project => {
        expect(project).toHaveProperty('_id');
        expect(project.ownerId).toBe(ownerId);
      });
    }
  });

  it(`Should return Project data with Project ID (Create Project)`, async () => {
    const projectCreateData = {
      name: 'Sunday Store',
      baseURL: 'https://sunday-store.herokuapp.com/api',
      description: 'Hacktiv8 Phase 2 Final Task',
      members: [],
      endpoints: []
    };
    const res = await projectAPI
      .post(`/projects/${ownerId}`)
      .send(projectCreateData)
      .set('token', token);
    const project = res.body.project;
    expect(project).toHaveProperty('_id');
    projectId = project._id;
    expect(Object.keys(project).length).toBe(7);
    expect(project.members.length >= 0).toBe(true);
    expect(project.endpoints.length).toBe(0);
  });

  it(`Should return Project data (Find One Project).`, async () => {
    const res = await projectAPI
      .get(`/projects/${ownerId}/${projectId}`)
      .set('token', token);
    const project = res.body.project;
    expect(Object.keys(project).length).toBe(7);
    expect(project.ownerId).toBe(ownerId);
    expect(project._id).toBe(projectId);
  });

  it(`Should return 'Authentication Failed' message (Update Project Authentication).`, async () => {
    const projectUpdateData = {
      name: 'Sunday Store using React',
      baseURL: 'https://sunday-store.herokuapp.com/api',
      description: 'Hacktiv8 Phase 2 Final Task',
      members: [],
      endpoints: []
    };
    const res = await projectAPI
      .put(`/projects/${ownerId}/${projectId}`)
      .send(projectUpdateData)
      .set('token', wrongToken);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Authentication Failed');
  });

  it('Should return updated Project data (Update Project).', async () => {
    const projectUpdateData = {
      name: 'Sunday Store using React',
      baseURL: 'https://sunday-store.herokuapp.com/api',
      description: 'Hacktiv8 Phase 2 Final Task',
      members: [],
      endpoints: []
    };
    const res = await projectAPI
      .put(`/projects/${ownerId}/${projectId}`)
      .send(projectUpdateData)
      .set('token', token);
    const project = res.body.project;
    expect(project).toHaveProperty('_id');
    expect(Object.keys(project).length).toBe(7);
  });

  // it(`Should return 'Unauthorized!' message.`, async () => {
  //   const res = await projectAPI
  //     .delete(`/projects/${ownerId}/${projectId}`)
  //     .set('token', wrongToken);
  //   const project = res.body.project;
  //   expect(project).toHaveProperty('message');
  //   expect(project.message).toBe('Unauthorized!');
  // });

  // it('Should return deleted Project data (Delete Project).', async () => {
  //   const res = await projectAPI
  //     .delete(`/projects/${ownerId}/${projectId}`)
  //     .set('token', token);
  //   const project = res.body.project;
  //   expect(Object.keys(project).length).toBe(6);
  // });
});

describe('Endpoint Unit Test', () => {
  it(`Should return all Endpoints (Find All Endpoints)`, async () => {
    const res = await projectAPI
      .get(`/endpoints/${projectId}`)
      .set('token', token);
    const endpoints = res.body.endpoints;
    expect(Array.isArray(endpoints)).toBe(true);
    if (endpoints.length > 0) {
      endpoints.forEach(endpoint => {
        expect(endpoint).toHaveProperty('projectId');
      });
    }
  });

  it(`Should return Endpoint data (Create Endpoint)`, async () => {
    const createEndpointData = {
      method: 'get',
      path: '/products',
      description: 'Fetch all products available.',
      headers: {},
      queryParams: {},
      body: {}
    };
    const res = await projectAPI
      .post(`/endpoints/${projectId}`)
      .send(createEndpointData)
      .set('token', token);
    const endpoint = res.body.endpoint;
    expect(Object.keys(endpoint).length).toBe(11);
    expect(endpoint).toHaveProperty('_id');
    endpointId = endpoint._id;
  });

  // it(`Should return Endpoint data (Update Endpoint)`, async () => {
  //   const updateEndpointData = {
  //     method: 'post',
  //     path: '/login',
  //     description: 'Login Endpoint of Sunday Store API.',
  //     headers: {},
  //     queryParams: {},
  //     body: {}
  //   };
  //   const res = await projectAPI
  //     .put(`/endpoints/${endpointId}`)
  //     .send(updateEndpointData)
  //     .set('token', token);
  //   const endpoint = res.body.endpoint;
  //   expect(Object.keys(endpoint).length).toBe(7);
  //   expect(endpoint).toHaveProperty('_id');
  //   expect(endpoint._id).toBe(endpointId);
  // });

  it(`Should return Endpoint data (Delete Endpoint)`, async () => {
    const res = await projectAPI
      .delete(`/endpoints/${projectId}/${endpointId}`)
      .set('token', token);
    const endpoint = res.body.endpoint;
    expect(Object.keys(endpoint).length).toBeGreaterThan(0);
    expect(endpoint).toHaveProperty('_id');
    expect(endpoint._id).toBe(endpointId);
  });
});

afterAll(async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/dokuin-api-test`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true
    });

    const users = mongoose.connection.collection('users');
    const projects = mongoose.connection.collection('projects');
    const endpoints = mongoose.connection.collection('endpoints');
    await users.drop();
    await projects.drop();
    await endpoints.drop();
    await mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
});
