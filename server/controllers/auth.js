'use strict';

const jwt = require('jsonwebtoken');
const Joi = require('joi');
const randomToken = require('random-token');
const encryptor = require('../utils/encryptor');
const TemplateEngine = require('../utils/template-engine');
const Models = require('../../db/models');

const sgMail = require('@sendgrid/mail');

const User = Models.User;
const ResetPassword = Models.ResetPassword;

function login(req, res) {
  const email = req.body.email || '';
  User.findOne({
    where: {
      email: email.toLowerCase(),
    },
  })
    .then(function(user) {
      if (user != null) {
        const matchCredentials = encryptor.compare(
          req.body.password,
          user.password
        );
        if (matchCredentials) {
          const payload = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET);
          res.cookie('access_token', token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
            secure: false, // set to true if your using https
          });
          return res.send(payload);
        }
      }
      res.status(400).send('Authentication failed.');
    })
    .catch(err => {
      return res.status(400).send(err);
    });
}

function logout(req, res) {
  res.clearCookie('access_token');
  res.send('');
}

function forgotPassword(req, res) {
  const email = req.body.email || '';
  User.findOne({
    where: { email: email.toLowerCase() },
  })
    .then(function(user) {
      if (!user) {
        return res.status(404).send();
      }

      var token = randomToken(10);
      var date = new Date();
      date.setDate(date.getDate() + 2);
      ResetPassword.create({
        user_id: user.id,
        token: token,
        expired: date,
      })
        .then(function() {
          // variables para email
          const sitio = process.env.SERVER_URL + '/reset-password/';
          const contacto = process.env.SERVER_URL + '/contact-us';
          const html = TemplateEngine.render(
            'template_email/recovery_password_email.html',
            { site: sitio, token: token, contact: contacto }
          );
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          const msg = {
            to: req.body.email,
            from: process.env.DEFAULT_EMAIL_FROM,
            subject: 'Recupera tu contraseña',
            html: html,
          };
          sgMail.send(msg).then(
            () => {},
            error => {
              console.error(error);
              if (error.response) {
                console.error(error.response.body);
              }
            }
          );
        })
        .catch(function() {
          res.status(500).send();
        });
    })
    .catch(function() {
      res.status(500).send();
    });
}

function resetPassword(req, res) {
  const token = req.params.token;
  ResetPassword.findOne({
    where: { token: token },
  })
    .then(function(resetPassword) {
      if (!resetPassword) {
        return res.status(404).send();
      }
      const now = new Date();
      if (resetPassword.expired >= now) {
        var data = req.body;
        const validationSchema = {
          new_password: Joi.string()
            .required()
            .regex(/^[a-zA-Z0-9]{8,18}$/),
          confirm_password: Joi.any()
            .valid(Joi.ref('new_password'))
            .required()
            .options({
              language: { any: { allowOnly: 'must match password' } },
            }),
        };
        const result = Joi.validate(data, validationSchema, {
          abortEarly: false,
          allowUnknown: true,
        });

        if (result.error) {
          return res.status(400).send(result.error.details);
        }

        const password = encryptor.encrypt(req.body.new_password);

        return User.update(
          { password: password },
          { where: { id: resetPassword.user_id } }
        )
          .then(function() {
            resetPassword.destroy();
            res.send('');
          })
          .catch(function() {
            res.status(500).send();
          });
      }
      res.status(403).send();
    })
    .catch(function() {
      res.status(500).send();
    });
}

module.exports = {
  login,
  logout,
  forgotPassword,
  resetPassword,
};
