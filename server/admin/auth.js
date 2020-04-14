'use strict';

const passport = require('passport');
const nodemailer = require('nodemailer');
const Models = require('../../db/models');
const encryptor = require('../../server/utils/encryptor');
const User = Models.User;
const ResetPassword = Models.ResetPassword;
const Joi = require('joi');
const Validator = require('../utils/validator');
var randomToken = require('random-token');
const TemplateEngine = require('../../server/utils/template-engine');
const sgMail = require('@sendgrid/mail');
const LOGIN_URL = '/admin/login';

class AuthAdminController {
  constructor() {
    this.authenticate = passport.authenticate('local', {
      successRedirect: '/admin',
      failureRedirect: LOGIN_URL,
      failureFlash: true,
    });
  }

  login(req, res) {
    res.render('auth/login');
  }

  logout(req, res) {
    req.logout();
    res.redirect(LOGIN_URL);
  }

  forgotPassword(req, res) {
    res.render('auth/forgot-password');
  }

  resetPassword(req, res) {
    var token = req.params.token;
    ResetPassword.findOne({
      where: { token: token },
    })
      .then(function(resetPassword) {
        const date = new Date();
        if (resetPassword.expired >= date) {
          res.render('auth/reset-password', { token: token });
        } else {
          res.redirect('/admin/login');
        }
      })
      .catch(function(err) {
        console.error(err);
        res.redirect('/admin/login');
      });
  }

  resetpassword(req, res) {
    var data = req.body;
    const token = req.body.token;
    const validationSchema = {
      new_password: Joi.string()
        .required()
        .regex(/^[a-zA-Z0-9]{6,18}$/),
      confirm_password: Joi.any()
        .valid(Joi.ref('new_password'))
        .required()
        .options({ language: { any: { allowOnly: 'must match password' } } }),
    };
    const result = Joi.validate(data, validationSchema, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (result.error) {
      var error = Validator.getErrors(result.error.details);
      req.flash('field_errors', error);
      return res.redirect('/admin/reset-password/' + token);
    }
    const password = encryptor.encrypt(req.body.new_password);
    ResetPassword.findOne({
      where: { token: token },
    })
      .then(function(resetPassword) {
        User.update(
          { password: password },
          { where: { id: resetPassword.user_id } }
        )
          .then(function() {
            resetPassword.destroy();
            req.flash('success', 'Your data has been saved.');
            res.redirect('/admin/login');
          })
          .catch(function(err) {
            req.flash('error', err.message);
          });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  forgotpassword(req, res) {
    User.findOne({
      where: { email: req.body.email },
    })
      .then(function(user) {
        if (!user) {
          req.flash('field_errors', 'Is not Registered');
          return res.redirect('/admin/forgot-password');
        }
        // variables para resetpassword
        var token = randomToken(10);
        var date = new Date();
        date.setDate(date.getDate() + 2);
        ResetPassword.create({
          user_id: user.id,
          token: token,
          expired: date,
        })
          .then(function() {
            
            // variables para emqil
            const sitio = process.env.SERVER_URL + '/admin/reset-password/';
            const html = TemplateEngine.render(
              'template_email/reset_password.html',
              { site: sitio, token: token }
            );
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const mailOptions = {
              to: req.body.email,
              from: process.env.DEFAULT_EMAIL_FROM,
              subject: 'Password Reset Request', // Subject line
              html: html,
            };
            sgMail.send(mailOptions).
            then(() => {}, error => {
                console.error(error);
                if (error.response) {
                  console.error(error.response.body)
                }
            }); 
            return res.redirect('/admin/login');
          })
          .catch(function(err) {
            console.log(err);
          });
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}

module.exports = new AuthAdminController();
