'use strict';

const router = require('express').Router();
const { UserController } = require('../controllers');
const { authenticate } = require('../middlewares');

router.get(`/`, UserController.findAll);
router.get(`/:userId`, UserController.findOne);
router.post(`/signup`, UserController.signUp);
router.post(`/signin`, UserController.signIn);
router.put(`/:userId`, authenticate, UserController.update);
router.delete(`/:userId`, authenticate, UserController.delete);

module.exports = router;
