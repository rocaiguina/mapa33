'use strict';

const express = require('express');
const router = express.Router();

const LandAdminController = require('./land');
const LandMiddleware      = require('../middlewares/land');

router.get('/', function (req, res, next) {
  res.render('dashboard/index');
});

router.get('/land', LandAdminController.findAll);
router.get('/land/:id', LandMiddleware.lookup, LandAdminController.get);
router.post('/land/:id', LandMiddleware.lookup, LandAdminController.save);
router.post('/land/:id/remove', LandMiddleware.lookup, LandAdminController.remove);

module.exports = router;
