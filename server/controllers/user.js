'use strict';

const Joi = require('joi');
const Models = require('../../db/models');
const User = Models.User;
const encryptor = require('../../server/utils/encryptor');

class UserController {
  findAll(req, res, next) {
    User.findAll({ raw: true })
      .then(function(users) {
        for (let i = 0; i < users.length; i++) {
          delete users[i]['password'];
        }
        res.json({ data: users });
      })
      .catch(function(err) {
        res.status(400).send(err);
      })
      .finally(function() {
        next();
      });
  }

  lookup(req, res, next) {
    let uid = req.params.id;
    if (req.params.id == 'me') {
      uid = req.user.id;
    }
    User.findOne({ where: { id: uid } })
      .then(function(user) {
        if (!user) {
          return res.status(404).send('');
        }
        req.user = user;
        next();
      })
      .catch(function(err) {
        res.status(400).send(err);
      });
  }

  store(req, res) {
    const validationSchema = {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      phone: Joi.string().required(),
      birthday: Joi.string().required(),
      gender: Joi.string().allow(''),
      company: Joi.string()
        .optional()
        .allow(null, ''),
      address: Joi.string().required(),
      city: Joi.string().required(),
      estate: Joi.string()
        .optional()
        .allow(null, ''),
      country: Joi.string().required(),
      zip_code: Joi.string().required(),
      advs_by_email: Joi.boolean(),
      advs_by_zip: Joi.boolean(),
      interested_volunteer: Joi.boolean(),
    };

    const result = Joi.validate(req.body, validationSchema, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (result.error) {
      return res.status(400).send(result.error);
    }

    const cleaned_data = result.value;

    // Save new user.
    User.create({
      first_name: cleaned_data.first_name,
      last_name: cleaned_data.last_name,
      email: cleaned_data.email,
      password: encryptor.encrypt(cleaned_data.password),
      phone: cleaned_data.phone,
      birthday: cleaned_data.birthday,
      gender: cleaned_data.gender,
      company: cleaned_data.company,
      address: cleaned_data.address,
      city: cleaned_data.city,
      estate: cleaned_data.estate,
      country: cleaned_data.country,
      zip_code: cleaned_data.zip_code,
      advs_by_email: cleaned_data.advs_by_email,
      advs_by_zip: cleaned_data.advs_by_zip,
      interested_volunteer: cleaned_data.interested_volunteer,
    })
      .then(function(user) {
        res.json(user.get({ plain: true }));
      })
      .catch(function(err) {
        res.status(400).send(err);
      });
  }

  update(req, res, next) {
    const validationSchema = {
      full_name: Joi.string().required(),
      birthday: Joi.string().required(),
      phone: Joi.string().required(),
      gender: Joi.string().allow(''),
      company: Joi.string()
        .optional()
        .allow(null, ''),
      address: Joi.string().required(),
      city: Joi.string().required(),
      estate: Joi.string()
        .optional()
        .allow(null, ''),
      country: Joi.string().required(),
      zip_code: Joi.string().required(),
      advs_by_email: Joi.boolean(),
      advs_by_zip: Joi.boolean(),
    };

    const result = Joi.validate(req.body, validationSchema, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (result.error) {
      return res.status(400).send(result.error);
    }

    const cleaned_data = result.value;

    var user = req.user;

    user.full_name = cleaned_data.full_name;
    user.birthday = cleaned_data.birthday;
    user.phone = cleaned_data.phone;
    user.gender = cleaned_data.gender;
    user.company = cleaned_data.company;
    user.address = cleaned_data.address;
    user.city = cleaned_data.city;
    user.estate = cleaned_data.estate;
    user.country = cleaned_data.country;
    user.zip_code = cleaned_data.zip_code;
    user.advs_by_email = cleaned_data.advs_by_email;
    user.advs_by_zip = cleaned_data.advs_by_zip;

    user
      .save()
      .then(function(user) {
        res.send(user.get({ plain: true }));
      })
      .catch(function(err) {
        res.status(400).send(err);
      })
      .finally(function() {
        next();
      });
  }

  get(req, res, next) {
    delete req.user['dataValues']['password'];
    var user = req.user;
    res.json(user.get({ plain: true }));
    next();
  }

  remove(req, res, next) {
    var user = req.user;
    user
      .destroy()
      .then(function() {
        res.send('');
      })
      .catch(function(err) {
        res.status(400).send(err);
      })
      .finally(function() {
        next();
      });
  }
}

module.exports = new UserController();
