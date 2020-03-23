'use strict';

const router = require('express').Router();
const { UserController } = require('../controllers');

router.get(`/`, UserController.findAll);
router.get(`/:userId`, UserController.findOne);
router.post(`/signup`, UserController.signUp);
router.post(`/signin`);
router.put(`/:userId`, UserController.update);
router.delete(`/:userId`, UserController.delete);

module.exports = router;
