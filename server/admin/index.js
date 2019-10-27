'use strict';

const express   = require('express');
const passport  = require('passport');
const router    = express.Router();

const AuthAdminController = require('./auth');
const LandAdminController = require('./land');
const AuthMiddleware      = require('../middlewares/auth');
const LandMiddleware      = require('../middlewares/land');

router.get('/', AuthMiddleware.login_required, function (req, res, next) {
  res.render('dashboard/index');
});

router.get('/login', AuthAdminController.login);
router.post('/login', AuthAdminController.authenticate);
router.get('/logout', AuthAdminController.logout);

router.get('/land', AuthMiddleware.login_required, LandAdminController.findAll);
router.get('/land/:id', AuthMiddleware.login_required, LandMiddleware.lookup, LandAdminController.get);
router.post('/land/:id', AuthMiddleware.login_required, LandMiddleware.lookup, LandAdminController.save);
router.post('/land/:id/remove', AuthMiddleware.login_required, LandMiddleware.lookup, LandAdminController.remove);

module.exports = router;
