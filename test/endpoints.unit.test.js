const projectApp = require('../services/projects/app');
const endpointAPI = require('supertest')(projectApp);

let projectId;
let token;
let endpointId;

beforeAll(() => {
  projectId = process.env.PROJECT_ID;
  token = process.env.TOKEN;
});

describe('Endpoint Unit Test', () => {
  it(`Should return all Endpoints (Find All Endpoints)`, async () => {
    const res = await endpointAPI.get(`/endpoints/${projectId}`).set('token', token);
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
    const res = await endpointAPI.post(`/endpoints/${projectId}`).send(createEndpointData).set('token', token);
    const endpoint = res.body.endpoint;
    expect(Object.keys(endpoint).length).toBe(7);
    expect(endpoint).toHaveProperty('_id');
    endpointId = endpoint._id;
  });

  it(`Should return Endpoint data (Update Endpoint)`, async () => {
    const updateEndpointData = {
      method: 'post', 
      path: '/login', 
      description: 'Login Endpoint of Sunday Store API.', 
      headers: {},
      queryParams: {},
      body: {}
    };
    const res = await endpointAPI.put(`/endpoints/${endpointId}`).send(updateEndpointData).set('token', token);
    const endpoint = res.body.endpoint;
    expect(Object.keys(endpoint).length).toBe(7);
    expect(endpoint).toHaveProperty('_id');
    expect(endpoint._id).toBe(endpointId);
  });

  it(`Should return Endpoint data (Delete Endpoint)`, async () => {
    const res = await endpointAPI.delete(`/endpoints/${projectId}/${endpointId}`).set('token', token);
    const endpoint = res.body.endpoint;
    expect(Object.keys(endpoint).length).toBeGreaterThan(0);
    expect(endpoint).toHaveProperty('_id');
    expect(endpoint._id).toBe(endpointId);
  });
});
