'use strict';

const express   = require('express');
const passport  = require('passport');
const router    = express.Router();

const AuthAdminController = require('./auth');
const LandAdminController = require('./land');
const UserAdminController = require('./user');
const AccountAdminController = require('./account');
const AuthMiddleware      = require('../middlewares/auth');
const LandMiddleware      = require('../middlewares/land');
const UserMiddleware      = require('../middlewares/user');
//const AccountMiddleware      = require('../middlewares/');

router.get('/', AuthMiddleware.login_required, function (req, res, next) {
  res.render('dashboard/index');
});

router.get('/login', AuthAdminController.login);
router.post('/login', AuthAdminController.authenticate);
router.get('/logout', AuthAdminController.logout);
router.get('/forgot-password', AuthAdminController.forgotPassword);
router.get('/reset-password', AuthAdminController.resetPassword);
//TODO: Routes land
router.get('/land', AuthMiddleware.login_required, LandAdminController.findAll);
router.get('/land/:id', AuthMiddleware.login_required, LandMiddleware.lookup, LandAdminController.get);
router.post('/land/:id', AuthMiddleware.login_required, LandMiddleware.lookup, LandAdminController.save);
router.post('/land/:id/remove', AuthMiddleware.login_required, LandMiddleware.lookup, LandAdminController.remove);
//TODO: Routes User
router.get('/user',UserAdminController.findAll);
router.get('/user/:id',UserMiddleware.lookup,UserAdminController.get);
router.post('/user/:id',UserMiddleware.lookup,UserAdminController.save);
router.post('/user/:id/remove',UserMiddleware.lookup,UserAdminController.remove);
//TODO: Route password change
router.get('/account/change-password',AuthMiddleware.login_required, function(req,res,next){
  res.render('account/change-password');
});
router.post('/account/change-password',AuthMiddleware.login_required, AccountAdminController.save);

module.exports = router;
