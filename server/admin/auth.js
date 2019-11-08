'use strict';

const passport          = require('passport');
const nodemailer        = require('nodemailer');
const Models            = require('../../db/models');
const encryptor         = require('../../server/utils/encryptor');
const User              = Models.User;
const ResetPassword     = Models.ResetPassword;
const NodeMailer        = require('nodemailer-mailgun-transport');
const Joi               = require('joi');
const Validator         = require('../utils/validator');
var randomToken         = require('random-token');
const TemplateEngine    = require('../../server/utils/template-engine');

const LOGIN_URL         = '/admin/login';

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
      var token =  req.params.token;
    ResetPassword.
        findOne({
        where: {token: token}
    }).then(resetPassword =>{
        const date =  new Date();
        if(resetPassword.expired >= date){
            res.render('auth/reset-password',{token: token});
        }else{
            res.redirect('/admin/login')
        }
    }).catch(error => {
        console.error(error);
        res.redirect('/admin/login')
    })
  }

  resetpassword(req, res, next){
      var data = req.body;
      const token = req.body.token;
      const validationSchema = {
          new_password:           Joi.string().required().regex(/^[a-zA-Z0-9]{6,18}$/),
          confirm_password:       Joi.any().valid(Joi.ref('new_password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
      };
      const result = Joi.validate(data, validationSchema, { abortEarly: false, allowUnknown: true });
      if (result.error) {
          var error = Validator.getErrors(result.error.details);
          req.flash('field_errors', error);
          return res.redirect('/admin/reset-password/'+token);
      }
      const password = encryptor.encrypt(req.body.new_password);
      ResetPassword.
          findOne({
          where: {token : token}
      }).then(resetPassword =>{
          User.
          update(
              { password: password },
              {where: {id: resetPassword.user_id}}
          )
              .then(function () {
                  resetPassword.destroy();
                  req.flash('success', 'Your data has been saved.');
                  res.redirect('/admin/login');
              })
              .catch(function (err) {
                  console.error(err)
                  req.flash('error', err.message);
              })
      }).catch(error1 => {
          console.log(error1)
      })

  }


  forgotpassword (req, res, next) {
      User.
      findOne({
          where:{email:req.body.email}
      }).
      then(user =>{
        if(!user){
            req.flash('field_errors','Is not Registered')
            return res.redirect('/admin/forgot-password')
        }
        // variables para resetpassword
        var token = randomToken(10);
        var date = new Date();
        date.setDate(date.getDate() + 2);
        ResetPassword.create({
            user_id : user.id,
            token : token,
            expired: date
        }).then(resetPassword =>{
            const auth = {
                auth:{
                    api_key: process.env.API_KEY,
                    domain: process.env.DOMAIN
                }
            }
            var transporter = nodemailer.createTransport(NodeMailer(auth));
            // variables para emqil
            const sitio = process.env.SERVER_URL+'/admin/reset-password/';
            const html = TemplateEngine.render('template_email/reset_password.html',{site: sitio, token:token})

            const mailOptions = {
                from: process.env.EMAIL, // sender address
                to: req.body.email, // list of receivers
                subject: 'Password Reset Request', // Subject line
                html: html
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if(err) console.log(err);
                else console.log(info);
            });
            req.flash('success', 'Your e-mail has been sent.');
            return res.redirect('/admin/login');
        }).catch(error => {
            console.log(error)
        })
      }).catch(error => {
          console.log(error)
      })

  }
}

module.exports = new AuthAdminController();
