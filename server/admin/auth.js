'use strict';

const passport      = require('passport');
const nodemailer    = require('nodemailer');
const Models        = require('../../db/models');
const encryptor     = require('../../server/utils/encryptor');
const User          = Models.User;
var mg              = require('nodemailer-mailgun-transport');
const Joi           = require('joi');
const Validator     = require('../utils/validator');

const LOGIN_URL     = '/admin/login';

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
      console.log('ingreso a reset password');
      console.log(req.body);
      User.
      findOne({
          where: {email : req.body.email}
      }).then(result => {
          const dateupdate = req.body.dateUpdate;
          const dateupdatedb = result.updatedAt;
          if( dateupdate == dateupdatedb ){
              const date = new Date();
              const diference = result.updatedAt;
              var diasdif= date.getTime()-diference.getTime();
              var contdias = Math.round(diasdif/(1000*60*60*24));
              if(contdias <= 2){
                  res.render('auth/reset-password',{email: req.body.email});
              }else{
                  console.log('date algo salio mal');
              }
          }else{
              console.log('expiro algo salio mal');
          }

      }).catch(error => {
          console.log(error);
      })
  }

  resetPasswordForm(req, res, next){
      var data = req.body;
      const validationSchema = {
          new_password:           Joi.string().required().regex(/^[a-zA-Z0-9]{6,18}$/),
          confirm_password:       Joi.any().valid(Joi.ref('new_password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
      };
      const result = Joi.validate(data, validationSchema, { abortEarly: false, allowUnknown: true });
      if (result.error) {
          var error = Validator.getErrors(result.error.details);
          error.email = {email : req.body.email};
          req.flash('field_errors', error);
          return res.redirect('/admin/reset-password');
      }
      const password = encryptor.encrypt(req.body.new_password);
      User.
      update(
          { password: password },
          { where: {email: req.body.email} }
      )
          .then(function () {
              req.flash('success', 'Your data has been saved.');
          })
          .catch(function (err) {
              console.error(err)
              req.flash('error', err.message);
          })
          .finally(function () {
              res.redirect('/admin/login');
          });
  }

  forgotpassword (req, res, next) {
      const auth = {
          auth:{
              api_key: '550474fefeedbf867374e7116318d929-7bce17e5-da31a5c1',
              domain: 'sandbox8e895f2c24f542589602ff969cf8a5eb.mailgun.org'
          }
      }
      var transporter = nodemailer.createTransport(mg(auth));
      const email = req.body.email;
      User.
        findOne({
          where: {email : email}
        })
          .then(result => {
              console.log(result);
              if(!result){
                req.flash('field_errors', {dont_exist: {message: 'Is not registered'}});
                return res.redirect('/admin/forgot-password');
              }
              const date = new Date();
              const new_password = encryptor.encrypt(result.password);
              result.update({
                  password: new_password
              }).then(result =>{
                  console.log(result)
              })

              const mailOptions = {
                  from: 'lrocaiguina@gmail.com', // sender address
                  to: email, // list of receivers
                  subject: 'Password Reset Request', // Subject line
                  html: '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">' +
                      '<html xmlns="http://www.w3.org/1999/xhtml"' +
                      ' xmlns:v="urn:schemas-microsoft-com:vml"' +
                      ' xmlns:o="urn:schemas-microsoft-com:office:office">' +
                      '<head>' +
                      '  <!--[if gte mso 9]><xml>' +
                      '   <o:OfficeDocumentSettings>' +
                      '    <o:AllowPNG/>' +
                      '    <o:PixelsPerInch>96</o:PixelsPerInch>' +
                      '   </o:OfficeDocumentSettings>' +
                      '  </xml><![endif]-->' +
                      '  <!-- fix outlook zooming on 120 DPI windows devices -->' +
                      '  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">' +
                      '  <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- So that mobile will display zoomed in -->' +
                      '  <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- enable media queries for windows phone 8 -->' +
                      '  <meta name="format-detection" content="date=no"> <!-- disable auto date linking in iOS 7-9 -->' +
                      '  <meta name="format-detection" content="telephone=no"> <!-- disable auto telephone linking in iOS 7-9 -->' +
                      '  <title></title>' +
                      '  <style type="text/css">' +
                      'body {' +
                      '  margin: 0;' +
                      '  padding: 0;' +
                      '  -ms-text-size-adjust: 100%;' +
                      '  -webkit-text-size-adjust: 100%;' +
                      '}' +
                      'table {' +
                      '  border-spacing: 0;' +
                      '}' +
                      'table td {' +
                      '  border-collapse: collapse;' +
                      '}' +
                      '.ExternalClass {' +
                      '  width: 100%;' +
                      '}' +
                      '.ExternalClass,' +
                      '.ExternalClass p,' +
                      '.ExternalClass span,' +
                      '.ExternalClass font,' +
                      '.ExternalClass td,' +
                      '.ExternalClass div {' +
                      '  line-height: 100%;' +
                      '}' +
                      '.ReadMsgBody {' +
                      '  width: 100%;' +
                      '  background-color: #ebebeb;' +
                      '}' +
                      'table {' +
                      '  mso-table-lspace: 0pt;' +
                      '  mso-table-rspace: 0pt;' +
                      '}' +
                      'img {' +
                      '  -ms-interpolation-mode: bicubic;' +
                      '}' +
                      '.yshortcuts a {' +
                      '  border-bottom: none !important;' +
                      '}' +
                      '@media screen and (max-width: 599px) {' +
                      '  .force-row,' +
                      '  .container {' +
                      '    width: 100% !important;' +
                      '    max-width: 100% !important;' +
                      '  }' +
                      '}' +
                      '@media screen and (max-width: 400px) {' +
                      '  .container-padding {' +
                      '    padding-left: 12px !important;' +
                      '    padding-right: 12px !important;' +
                      '  }' +
                      '}' +
                      '.ios-footer a {' +
                      '  color: #aaaaaa !important;' +
                      '  text-decoration: underline;' +
                      '}' +
                      'a[href^="x-apple-data-detectors:"],' +
                      'a[x-apple-data-detectors] {' +
                      '  color: inherit !important;' +
                      '  text-decoration: none !important;' +
                      '  font-size: inherit !important;' +
                      '  font-family: inherit !important;' +
                      '  font-weight: inherit !important;' +
                      '  line-height: inherit !important;' +
                      '}' +
                      '</style>' +
                      '</head>' +
                      '<body style="margin:0; padding:0;" bgcolor="#F0F0F0" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">' +
                      '<!-- 100% background wrapper (grey background) -->\n' +
                      '<table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" bgcolor="#F0F0F0">' +
                      '  <tr>' +
                      '    <td align="center" valign="top" bgcolor="#F0F0F0" style="background-color: #F0F0F0;">' +
                      '      <br>' +
                      '      <!-- 600px container (white background) -->' +
                      '      <table border="0" width="600" cellpadding="0" cellspacing="0" class="container" style="width:600px;max-width:600px">' +
                      '        <tr>' +
                      '          <td class="container-padding header" align="left" style="font-family:Helvetica, Arial, sans-serif;font-size:24px;font-weight:bold;padding-bottom:12px;color:#DF4726;padding-left:24px;padding-right:24px">' +
                      '            Mapa 33' +
                      '          </td>' +
                      '        </tr>' +
                      '        <tr>' +
                      '          <td class="container-padding content" align="left" style="padding-left:24px;padding-right:24px;padding-top:12px;padding-bottom:12px;background-color:#ffffff">' +
                      '            <br>' +
                      '<div class="title" style="font-family:Helvetica, Arial, sans-serif;font-size:18px;font-weight:600;color:#374550">Reset your password?</div>' +
                      '<br>' +
                      '<div class="body-text" style="font-family:Helvetica, Arial, sans-serif;font-size:14px;line-height:20px;text-align:left;color:#333333">' +
                      '  If you requested a password reset, click on the button below. If you did not request this, ignore this email.' +
                      '  <br><br>' +
                      '  <div style="text-align: center" >' +
                      '     <form action="http://localhost:3000/admin/reset-password" method="post">' +
                      '         <input type="hidden" value="'+email+'" name="email" id="email">' +
                      '         <input type="hidden" value="'+result.updatedAt+'" name="dateUpdate" id="dateUpdate">' +
                      '         <button type="submit" style="border: none; background-color: #df4726; padding:10px;color: white; font-weight:bold;"> Reset Password </button>' +
                      '     </form>' +
                      '  </div>'+
                      '</div>' +
                      '          </td>' +
                      '        </tr>' +
                      '        <tr>' +
                      '          <td class="container-padding footer-text" align="left" style="font-family:Helvetica, Arial, sans-serif;font-size:12px;line-height:16px;color:#aaaaaa;padding-left:24px;padding-right:24px">' +
                      '            <br><br>' +
                      '            Sample Footer text: © 2015 Acme, Inc.' +
                      '            <br><br>' +
                      '            You are receiving this email because you opted in on our website. Update your <a href="#" style="color:#aaaaaa">email preferences</a> or <a href="#" style="color:#aaaaaa">unsubscribe</a>.' +
                      '            <br><br>' +
                      '            <strong>Acme, Inc.</strong><br>' +
                      '            <span class="ios-footer">' +
                      '              123 Main St.<br>' +
                      '              Springfield, MA 12345<br>' +
                      '            </span>' +
                      '            <a href="http://www.acme-inc.com" style="color:#aaaaaa">www.acme-inc.com</a><br>' +
                      '            <br><br>' +
                      '          </td>' +
                      '        </tr>' +
                      '      </table>' +
                      '<!--/600px container -->' +
                      '    </td>' +
                      '  </tr>' +
                      '</table>' +
                      '<!--/100% background wrapper-->' +
                      '' +
                      '</body>' +
                      '</html>'// plain text body
              };
              transporter.sendMail(mailOptions, function (err, info) {
                  if(err)
                      console.log(err);
                  else
                      console.log(info);
              });
              req.flash('success', 'Your e-mail has been sent.');
              return res.redirect('/admin/forgot-password');
          })
          .catch(function (err) {
              console.error(err)
              req.flash('error', err.message);
          })
  }
}

module.exports = new AuthAdminController();
