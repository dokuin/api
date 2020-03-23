'use strict';

const router = require('express').Router();
const { ProjectController } = require('../controllers');

router.get(`/:userId`, ProjectController.findAll);
router.get(`/:userId/:projectId`, ProjectController.findOne);
router.post(`/:userId`, ProjectController.create);
router.put(`/:userId/:projectId`, ProjectController.update);
router.delete(`/:userId/:projectId`, ProjectController.delete);

module.exports = router;
