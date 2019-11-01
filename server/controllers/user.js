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
        req.body.password = encryptor.encrypt(req.body.password);
        var data = req.body;
        const validationSchema = {
            first_name:           Joi.string().required(),
            last_name:            Joi.string().required(),
            email:                Joi.string().required(),
            password:             Joi.string().required()
        };

        // Validata data.
        const result = Joi.validate(data, validationSchema);

        if (result.error) {
            res.status(400).send(result.error);
            return next();
        }

        const cleaned_data = result.value;

        // Save new user.
        User
            .create({
                first_name:            cleaned_data.first_name,
                last_name:             cleaned_data.last_name,
                email:                 cleaned_data.email,
                password:              cleaned_data.password,
            })
            .then(function (user) {
                console.log(user);
                delete user['dataValues']['password'];
                res.json(user.get({plain: true}));
            })
            .catch(function (err) {
                res.status(400).send(err);
            })
            .finally(function () {
                next();
            });
    }

    update (req, res, next) {
        req.body.password = encryptor.encrypt(req.body.password);
        var data = req.body;
        console.log('DATOS:');
        console.log(data);
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
        //user.email                = cleaned_data.email;
        user.password             = cleaned_data.password;

        user
            .save()
            .then(function () {
                res.send('');
            })
            .catch(function (err) {
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
