'use strict';

const Joi           = require('joi');
const Paginator     = require('paginator');

const Models        = require('../../db/models');
const User          = Models.User;
const Validator     = require('../utils/validator');
const encryptor = require('../../server/utils/encryptor');


class UserAdminController{
    findAll (req, res, next) {
        let options = {
            page: req.query.page || 1,
            paginate: req.query.limit || 10
        };

        User
            .paginate(options)
            .then(function (data) {
                let paginator = new Paginator(options.paginate, 5).build(data.total, options.page);
                data.current_page = paginator.current_page;
                data.next_page = paginator.next_page;
                data.previous_page = paginator.previous_page;
                data.has_previous_page = paginator.has_previous_page;
                data.has_next_page = paginator.has_next_page;
                res.render('user/index', { paginator: data });
            })
            .catch(function (err) {
                next(err);
            });
    }
    save (req, res, next) {
        var user = req.user;
        var data = req.body;

        const validationSchema = {
            first_name:          Joi.string().required().regex(/^[A-Za-z.\s_-]+$/),
            last_name:           Joi.string().required().regex(/^[A-Za-z.\s_-]+$/),
            password:            Joi.string().required().regex(/^[a-zA-Z0-9]{6,18}$/)
        };

        if(data.email != null){
            Object.assign(validationSchema,{email: Joi.string().required().email({ minDomainAtoms: 2 })})
        }

        // Validata data.
        const result = Joi.validate(data, validationSchema, { abortEarly: false, allowUnknown: true });

        if (result.error) {
            // Add error flash messages.
            req.flash('field_errors', Validator.getErrors(result.error.details));

            return res.redirect('/admin/user/' + (user.isNewRecord ? '-1' : user.id));
        }

        result['value']['password'] = encryptor.encrypt(result['value']['password']);
        const cleaned_data = result.value;

        user.first_name         = cleaned_data.first_name;
        user.last_name          = cleaned_data.last_name;
        user.password           = cleaned_data.password;

        if(cleaned_data.email != null){
            user.email           = cleaned_data.email;
        }

        user
            .save()
            .then(function () {
                req.flash('success', 'Your data has been saved.');
            })
            .catch(function (err) {
                console.error(err)
                req.flash('error', err.message);
            })
            .finally(function () {
                res.redirect('/admin/user/' + user.id);
            });
    }

    get (req, res, next) {
        let user = req.user.get({plain: true});
        res.render('user/form', { object: user});
    }

    remove (req, res, next) {
        var user = req.user;

        user
            .destroy()
            .then(function () {
                res.redirect('/admin/user');
            })
            .catch(function (err) {
                next(err);
            });
    }}

module.exports = new UserAdminController();