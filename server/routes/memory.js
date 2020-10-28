'use strict';

const express = require('express');
const router = express.Router();

const MemoryController = require('../controllers/memory');
const JWTMiddleware = require('../middlewares/jwt');

router.post('/', JWTMiddleware.requireJWT, MemoryController.store);

module.exports = router;
