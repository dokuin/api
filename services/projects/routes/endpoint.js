'use strict';

const router = require('express').Router();
const { EndpointController } = require('../controllers');
const { authenticate } = require('../middlewares');

router.use(authenticate)
router.get(`/:projectId`, EndpointController.findAll);
router.get(`/:projectId/:endpointId`, EndpointController.findOne);
router.post(`/:projectId`, EndpointController.create);
router.put(`/:projectId/:endpointId`, EndpointController.update);
router.patch(`/:projectId/:endpointId`, EndpointController.patchResponse);
router.delete(`/:projectId/:endpointId`, EndpointController.delete);

module.exports = router