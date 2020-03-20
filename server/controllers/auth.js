'use strict';

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const MailGun = require('nodemailer-mailgun-transport');
const Joi = require('joi');
const randomToken = require('random-token');
const encryptor = require('../utils/encryptor');
const TemplateEngine = require('../utils/template-engine');
const Models = require('../../db/models');

const User = Models.User;
const ResetPassword = Models.ResetPassword;

function login(req, res) {
  User.findOne({
    where: {
      email: req.body.email,
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
          res.send(payload);
        }
      }
      res.status(400).send('Authentication failed.');
    })
    .catch(err => {
      return res.status(400).send(err);
    });
}

function forgotPassword(req, res) {
  User.findOne({
    where: { email: req.body.email },
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
          const auth = {
            auth: {
              api_key: process.env.MAILGUN_API_KEY,
              domain: process.env.MAILGUN_DOMAIN,
            },
          };
          var transporter = nodemailer.createTransport(MailGun(auth));
          // variables para email
          const sitio = process.env.SERVER_URL + '/reset-password/';
          const html = TemplateEngine.render(
            'template_email/reset_password.html',
            { site: sitio, token: token }
          );

          const mailOptions = {
            from: process.env.DEFAULT_EMAIL_FROM, // sender address
            to: req.body.email, // list of receivers
            subject: 'Password Reset Request', // Subject line
            html: html,
          };
          transporter.sendMail(mailOptions, function(err, info) {
            console.log(err, info);
          });
          res.send('');
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
  forgotPassword,
  resetPassword,
};
