'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');

const AuthAdminController = require('./auth');
const LandAdminController = require('./land');
const UserAdminController = require('./user');
const AccountAdminController = require('./account');
const MemoryAdminController = require('./memory');
const AuthMiddleware = require('../middlewares/auth');
const LandMiddleware = require('../middlewares/land');
const UserMiddleware = require('../middlewares/user');
const MemoryMiddleware = require('../middlewares/memory');
const AdminMiddleware = require('../middlewares/admin');
const fileUploader = multer();

router.get('/', function(req, res) {
  res.redirect('/admin/land?level=&status=new');
});
// TODO: Routes account
router.get('/login', AuthAdminController.login, AdminMiddleware.admin_access);
router.post(
  '/login',
  AuthAdminController.authenticate,
  AdminMiddleware.admin_access
);
router.get('/logout', AuthAdminController.logout);
router.get('/forgot-password', AuthAdminController.forgotPassword);
router.get('/reset-password/:token', AuthAdminController.resetPassword);
router.post('/reset-password', AuthAdminController.resetpassword);
router.post('/forgot-password', AuthAdminController.forgotpassword);
//TODO: Routes land
router.get(
  '/land',
  AuthMiddleware.login_required,
  AdminMiddleware.admin_access,
  LandAdminController.findAll
);
router.get(
  '/land/:id',
  AuthMiddleware.login_required,
  AdminMiddleware.admin_access,
  LandMiddleware.lookup,
  LandAdminController.get
);
router.post(
  '/land/:id',
  AuthMiddleware.login_required,
  AdminMiddleware.admin_access,
  LandMiddleware.lookup,
  fileUploader.single('photograph'),
  LandAdminController.save
);
router.post(
  '/land/:id/remove',
  AuthMiddleware.login_required,
  AdminMiddleware.admin_access,
  LandMiddleware.lookup,
  LandAdminController.remove
);
router.get(
  '/memory',
  AuthMiddleware.login_required,
  AdminMiddleware.admin_access,
  MemoryAdminController.findAll
);
router.get(
  '/memory/:id',
  AuthMiddleware.login_required,
  AdminMiddleware.admin_access,
  MemoryMiddleware.lookup,
  MemoryAdminController.get
);
router.post(
  '/memory/:id',
  AuthMiddleware.login_required,
  AdminMiddleware.admin_access,
  MemoryMiddleware.lookup,
  MemoryAdminController.save
);
//TODO: Routes User
router.get(
  '/user',
  AuthMiddleware.login_required,
  AdminMiddleware.admin_access,
  UserAdminController.findAll
);
router.get(
  '/user/:id',
  AuthMiddleware.login_required,
  AdminMiddleware.admin_access,
  UserMiddleware.lookup,
  UserAdminController.get
);
router.post(
  '/user/:id',
  AuthMiddleware.login_required,
  AdminMiddleware.admin_access,
  UserMiddleware.lookup,
  UserAdminController.save
);
router.post(
  '/user/:id/remove',
  AuthMiddleware.login_required,
  AdminMiddleware.admin_access,
  UserMiddleware.lookup,
  UserAdminController.remove
);
router.get(
  '/exportUsers',
  AuthMiddleware.login_required,
  AdminMiddleware.admin_access,
  UserAdminController.export
);
//TODO: Route password change
router.get(
  '/account/change-password',
  AuthMiddleware.login_required,
  AdminMiddleware.admin_access,
  function(req, res) {
    res.render('account/change-password');
  }
);
router.post(
  '/account/change-password',
  AuthMiddleware.login_required,
  AdminMiddleware.admin_access,
  AccountAdminController.save
);

module.exports = router;
