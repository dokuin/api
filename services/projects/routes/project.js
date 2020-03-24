'use strict';

const router = require('express').Router();
const { ProjectController } = require('../controllers');
const { checkProject, authenticate } = require('../middlewares');

router.use(authenticate)
router.get(`/:ownerId`, ProjectController.findAll);
router.get(`/:ownerId/:projectId`, checkProject, ProjectController.findOne);
router.post(`/:ownerId`, ProjectController.create);
router.put(`/:ownerId/:projectId`, checkProject, ProjectController.update);
router.delete(`/:ownerId/:projectId`, checkProject, ProjectController.delete);

module.exports = router