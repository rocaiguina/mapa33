'use strict';

const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth');

router.post('/login', AuthController.login);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password/:token', AuthController.resetPassword);

module.exports = router;
