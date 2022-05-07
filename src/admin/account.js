'use strict';

const Joi = require('joi');
const Validator = require('../utils/validator');
const encryptor = require('../utils/encryptor');
const Models = require('../../db/models');
const User = Models.User;

class AccountController {
  save(req, res) {
    var user = req.user;
    var data = req.body;

    const validationSchema = {
      current_password: Joi.string()
        .required()
        .regex(/^[a-zA-Z0-9]{6,18}$/),
      new_password: Joi.string()
        .required()
        .regex(/^[a-zA-Z0-9]{6,18}$/),
      confirm_new_password: Joi.any()
        .valid(Joi.ref('new_password'))
        .required()
        .options({ language: { any: { allowOnly: 'must match password' } } }),
    };

    // Validata data.
    const result = Joi.validate(data, validationSchema, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (result.error) {
      // Add error flash messages.
      var error = Validator.getErrors(result.error.details);
      // compare current password
      const compare = encryptor.compare(data.current_password, user.password);
      if (!compare) {
        error.invalid = { message: 'Please enter your current password' };
      }
      req.flash('field_errors', error);
      return res.redirect('/admin/account/change-password');
    } else if (!encryptor.compare(data.current_password, user.password)) {
      const error = {};
      error.invalid = { message: 'Please enter your current password' };
      req.flash('field_errors', error);
      return res.redirect('/admin/account/change-password');
    }

    result['value']['new_password'] = encryptor.encrypt(
      result['value']['new_password']
    );
    const cleaned_data = result.value;
    user.password = cleaned_data.new_password;

    User.update({ password: user.password }, { where: { id: user.id } })
      .then(function() {
        req.flash('success', 'Your data has been saved.');
      })
      .catch(function(err) {
        req.flash('error', err.message);
      })
      .finally(function() {
        res.redirect('/admin/land');
      });
  }
}

module.exports = new AccountController();
