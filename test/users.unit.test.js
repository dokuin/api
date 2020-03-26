const userApp = require('../services/users/app');
const userAPI = require('supertest')(userApp);

let token;
let userId;

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
    expect(user).toHaveProperty('token');
    userId = user._id;
    token = user.token;
  });

  it(`Should return 'Email is already taken!' message (User Sign Up).`, async () => {
    const signUpData = {
      fullName: 'John Doe', 
      username: 'john', 
      profilePicURL: 'https://something', 
      email: 'john@doe.com', 
      password: 'johndone'
    };
    const res = await userAPI.post('/users/signup').send(signUpData);
    const user = res.body.user;
    expect(user).toHaveProperty('message');
    expect(user.message).toBe('Email is already taken!');
  });

  it('Should return JWT token and User data (User Sign In).', async () => {
    const signInData = {
      userIdentifier: 'john@doe.com',
      password: 'johndone'
    };
    const res = await userAPI.post('/users/signin').send(signInData);
    const user = res.body.user;
    expect(user).toHaveProperty('_id');
    expect(user).toHaveProperty('token');
    userId = user._id;
    token = user.token;
  });

  it(`Should return 'Invalid email or password!' message. (User Sign In)`, async () => {
    const signInData = {
      userIdentifier: 'doe@john.com',
      password: 'johndone'
    };
    const res = await userAPI.post('/users/signin').send(signInData);
    const user = res.body.user;
    expect(user).toHaveProperty('message');
    expect(user.message).toBe('Invalid email or password!');
  });

  it(`Should return 'Unauthorized!' message (User Update)`, async () => {
    const updateUserData = {
      fullName: 'John Doe', 
      username: 'john', 
      profilePicURL: 'https://something', 
      email: 'john@doe.com', 
      password: 'johndone'
    };
    const res = await userAPI.put(`/users/${userId}`).send(updateUserData).set('token', wrongToken);
    const user = res.body.user;
    expect(user).toHaveProperty('message');
    expect(user.message).toBe('Unauthorized!');
  });

  it(`Should return User data (User Update).`, async () => {
    const updateUserData = {
      fullName: 'Adam Jackson',
      username: 'adamjack',
      profilePicURL: 'https//:something',
      email: 'adam@jack.com',
      password: 'adamzzz'
    };
    const res = await userAPI.put(`/users/${userId}`).send(updateUserData).set('token', token);
    const user = res.body.user;
    expect(user).toHaveProperty('_id');
    expect(Object.keys(user).length).toBe(6);
  });

  it(`Should return 'Unauthorized!' message (User Delete).`, async () => {
    const res = await userAPI.delete(`/users/${userId}`).set('token', wrongToken);
    const user = res.body.user;
    expect(user).toHaveProperty('message');
    expect(user.message).toBe('Unauthorized!');
  });

  it(`Should return User data (User Delete)`, async () => {
    const res = await userAPI.delete(`/users/${userId}`).set('token', token);
    const user = res.body.user;
    expect(user).toHaveProperty('_id');
    expect(Object.keys(user).length).toBe(6);
  });
});

afterAll(() => {
  process.env.TOKEN = token;
  process.env.USER_ID = userId;
  process.env.WRONG_TOKEN = wrongToken;
});
