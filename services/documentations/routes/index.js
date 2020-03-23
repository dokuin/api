'use strict';

const router = require('express').Router();
const { DocumentationController } = require('../controllers');

router.get(`/:userId`, DocumentationController.findAll);
router.get(`/:userId/:documentationId`, DocumentationController.findOne);
router.post(`/:userId`, DocumentationController.create);
router.put(`/:userId/:documentationId`, DocumentationController.update);
router.delete(`/:userId/:documentationId`, DocumentationController.delete);

module.exports = router;
