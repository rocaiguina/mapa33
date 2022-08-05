'use strict';

const express = require('express');
const router = new express.Router();

// routes
router.use('/land', require('./routes/land'));
router.use('/user', require('./routes/user'));
router.use('/auth', require('./routes/auth'));
router.use('/file', require('./routes/file'));
router.use('/profile', require('./routes/profile'));
router.use(function(req, res) {
  res.status(404).end();
});

module.exports = router;