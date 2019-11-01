'use strict';

const passport = require('passport');

const LOGIN_URL = '/admin/login';

class AuthAdminController {

  constructor() {
    this.authenticate = passport.authenticate('local', { successRedirect: '/admin', failureRedirect: LOGIN_URL, failureFlash: true});
  }

  login (req, res, next) {
    res.render('auth/login');
  }

  logout(req, res, next) {
    req.logout();
    res.redirect(LOGIN_URL);
  }

  forgotPassword (req, res, next) {
    res.render('auth/forgot-password');
  }

  resetPassword (req, res, next) {
    res.render('auth/reset-password');
  }
}

module.exports = new AuthAdminController();
