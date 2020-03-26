const projectApp = require('../services/projects/app');
const projectAPI = require('supertest')(projectApp);

let wrongToken;
let token;
let ownerId;
let projectId;

beforeAll(() => {
  token = process.env.TOKEN;
  wrongToken = process.env.WRONG_TOKEN;
  ownerId = process.env.USER_ID;
});

describe('Project API Test', () => {
  it('Should return all available projects (Find All Projects).', async () => {
    const res = await projectAPI.get(`/projects/${ownerId}`);
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
    const res = await projectAPI.post(`/projects/${ownerId}`).send(projectCreateData).set('token', token);
    const project = res.body.project;
    expect(project).toHaveProperty('_id');
    projectId = project._id;
    expect(Object.keys(project).length).toBe(6);
    expect(project.members.length >= 0).tobe(true);
    expect(project.endpoints.length).toBe(0);
  });

  it(`Should return Project data (Find One Project).`, async () => {
    const res = projectAPI.get(`/projects/${ownerId}/${projectId}`);
    const project = res.body.project;
    expect(Object.keys(project).length).toBe(6);
    expect(project.ownerId).toBe(ownerId);
    expect(project._id).toBe(projectId);
  });

  it(`Should return 'Unauthorized!' message (Update Project Authentication).`, async () => {
    const projectUpdateData = {
      name: 'Sunday Store using React', 
      baseURL: 'https://sunday-store.herokuapp.com/api', 
      description: 'Hacktiv8 Phase 2 Final Task', 
      members: [],
      endpoints: []
    };
    const res = await projectAPI.put(`/projects/${ownerId}/${projectId}`).send(projectUpdateData).set('token', wrongToken);
    const project = res.body.project;
    expect(project).toHaveProperty('message');
    expect(project.message).toBe('Unauthorized!'); 
  });

  it('Should return updated Project data (Update Project).', async () => {
    const projectUpdateData = {
      name: 'Sunday Store using React', 
      baseURL: 'https://sunday-store.herokuapp.com/api', 
      description: 'Hacktiv8 Phase 2 Final Task', 
      members: [],
      endpoints: []
    };
    const res = await projectAPI.put(`/projects/${ownerId}/${projectId}`).send(projectUpdateData).set('token', token);
    const project = res.body.project;
    expect(project).toHaveProperty('_id');
    expect(Object.keys(project).length).toBe(6);
  });

  it(`Should return 'Unauthorized!' message.`, async () => {
    const res = await projectAPI.delete(`/projects/${ownerId}/${projectId}`).set('token', wrongToken);
    const project = res.body.project;
    expect(project).toHaveProperty('message');
    expect(project.message).toBe('Unauthorized!');
  });

  it('Should return deleted Project data (Delete Project).', async () => {
    const res = await projectAPI.delete(`/projects/${ownerId}/${projectId}`).set('token', token);
    const project = res.body.project;
    expect(Object.keys(project).length).toBe(6);
  });
});

afterAll(() => {
  process.env.PROJECT_ID = projectId;
});

