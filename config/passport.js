'use strict';

const passport        = require('passport');
const LocalStrategy   = require('passport-local');

const encryptor       = require('../src/utils/encryptor');
const models          = require('../db/models');
const User            = models.User;

const local = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function (email, password, done) {
  User
    .findOne({ where: { email: email.toLowerCase() }})
    .then(function (user) {
      if (!user) { return done(null, false, { message: 'Authentication failed.' }) }


      const isValidPassword = encryptor.compare(password, user.password);

      if (!isValidPassword) {
        return done(null, false, { message: 'Authentication failed.' });
      }

      if (user.role != 'administrator') { return done(null, false, { message: 'Access Denied.'}) }
      return done(null, user.get({plain: true}));
    })
    .catch(function (err) {
      done(err, false, { message: 'Authentication failed.' });
    });
});

passport.use(local);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User
    .findByPk(id)
    .then(function (user) {
      done(null, user.get({plain: true}));
    })
    .catch(function (err) {
      done(err, null);
    });
});
