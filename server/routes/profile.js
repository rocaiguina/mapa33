'use strict';

const express = require('express');
const router = express.Router();

const ProfileController = require('../controllers/profile');
const JWTMiddleware = require('../middlewares/jwt');

router.get(
  '/activities',
  JWTMiddleware.requireJWT,
  ProfileController.getActivities
);
router.delete(
  '/activity/land/:id',
  JWTMiddleware.requireJWT,
  ProfileController.deleteProposedLand
);
router.delete(
  '/activity/memory/:id',
  JWTMiddleware.requireJWT,
  ProfileController.deleteMemory
);
router.delete(
  '/activity/unlike/:id',
  JWTMiddleware.requireJWT,
  ProfileController.unLikeLand
);

module.exports = router;
