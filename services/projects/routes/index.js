'use strict';

const router = require('express').Router();
const endpointRoutes = require('./endpoint');
const projectRoutes = require('./project');

router.use('/projects', projectRoutes)
router.use('/endpoints', endpointRoutes)

module.exports = router;
