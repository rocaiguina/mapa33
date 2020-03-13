'use strict';

const Joi           = require('joi');
const Models        = require('../../db/models');
const User          = Models.User;
const encryptor = require('../../server/utils/encryptor');


class UserController {

    findAll (req, res, next) {
        User
            .findAll({ raw: true })
            .then(function (users) {
                for (let i = 0; i < users.length; i++) {
                    delete users[i]['password'];
                }
                res.json({ data: users });
            })
            .catch(function (err) {
                res.status(400).send(err);
            })
            .finally(function () {
                next();
            });
    }

    lookup (req, res, next) {
        User
            .findOne({ where: { id: req.params.id } })
            .then(function (user) {
                if (!user) { return res.status(404).send(''); }
                req.user = user;
                next();
            })
            .catch(function (err) {
                res.status(400).send(err);
            });
    }

    store (req, res, next) {
      const validationSchema = {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
        birthday: Joi.string().required(),
        gender: Joi.string().allow(''),
        company: Joi.string().allow(''),
        address: Joi.string().required(),
        city: Joi.string().required(),
        estate: Joi.string().required(),
        country: Joi.string().required(),
        zip_code: Joi.string().required(),
      };

      const result = Joi.validate(req.body, validationSchema);

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
      })
      .then(function (user) {
        res.json(user.get({plain: true}));
      })
      .catch(function (err) {
        res.status(400).send(err);
      });
    }

    update (req, res, next) {
        if(Object.keys(req.body).length == 0){
            return res.status(400).send('Your data is empty');
        }
        req.body.password = encryptor.encrypt(req.body.password);
        var data = req.body;
        const validationSchema = {
            first_name:           Joi.string().required(),
            last_name:            Joi.string().required(),
            password:             Joi.string().required(),
        };

        // Validata data.
        const result = Joi.validate(data, validationSchema);

        if (result.error) {
            res.status(400).send(result.error);
            return next();
        }

        const cleaned_data = result.value;

        var user = req.user;

        user.first_name           = cleaned_data.first_name;
        user.last_name            = cleaned_data.last_name;
        user.password             = cleaned_data.password;

        user
            .save()
            .then(function (user) {
                console.log(user)
                res.send('');
            })
            .catch(function (err) {
                console.log(err)
                res.status(400).send(err);
            })
            .finally(function () {
                next();
            });
    }

    get (req, res, next) {
        delete req.user['dataValues']['password'];
        var user = req.user;
        res.json(user.get({plain: true}));
        next();
    }

    remove (req, res, next) {
        var user = req.user;

        user
            .destroy()
            .then(function () {
                res.send('');
            })
            .catch(function () {
                res.status(400).send(err);
            })
            .finally(function () {
                next();
            });
    }

}

module.exports = new UserController();
