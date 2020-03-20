'use strict';

const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const UserSurveyController = require('../controllers/user-survey');
const SurveyMiddleware = require('../middlewares/survey');
const JWTMiddleware = require('../middlewares/jwt');

router.get('/', JWTMiddleware.requireJWT, UserController.findAll);
router.get(
  '/:id',
  JWTMiddleware.requireJWT,
  UserController.lookup,
  UserController.get
);
router.post('/', JWTMiddleware.requireJWT, UserController.store);
router.put(
  '/:id',
  JWTMiddleware.requireJWT,
  UserController.lookup,
  UserController.update
);
router.delete(
  '/:id',
  JWTMiddleware.requireJWT,
  UserController.lookup,
  UserController.remove
);

// User's surveys
router.post('/:userId/survey', UserSurveyController.store);
router.get(
  '/:userId/survey',
  SurveyMiddleware.lookup,
  UserSurveyController.get
);
router.put('/:userId/survey', UserSurveyController.store);
router.delete(
  '/:userId/survey',
  SurveyMiddleware.lookup,
  UserSurveyController.remove
);

module.exports = router;
