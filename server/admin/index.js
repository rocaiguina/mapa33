'use strict';

const express = require('express');
const router = express.Router();

const LandAdminController = require('./land');
const LandMiddleware      = require('../middlewares/land');

router.get('/', function (req, res, next) {
  res.render('dashboard/index');
});

router.get('/land', LandAdminController.findAll);
router.post('/land', LandAdminController.store);
router.get('/land/create', LandAdminController.create);
router.get('/land/:id', LandAdminController.get);
router.post('/land/:id', LandAdminController.update);
router.post('/land/:id/remove', LandMiddleware.lookup, LandAdminController.remove);

module.exports = router;
