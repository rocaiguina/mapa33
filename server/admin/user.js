'use strict';

const Joi               = require('joi');
const Paginator         = require('paginator');
const Models            = require('../../db/models');
const SurveyAnswer      = Models.SurveyAnswer;
const User              = Models.User;
const Validator         = require('../utils/validator');
const encryptor         = require('../../server/utils/encryptor');
const createCsvWriter   = require('csv-writer').createObjectCsvWriter;

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
            role:                Joi.string().required()
        };
        if(data.password){
            validationSchema['password'] = Joi.string().required().regex(/^[a-zA-Z0-9]{6,18}$/);
        }
        if(data.email != null){
            Object.assign(validationSchema,{email: Joi.string().required().email({ minDomainAtoms: 2 })})
        }
        console.log(validationSchema)
        // Validata data.
        const result = Joi.validate(data, validationSchema, { abortEarly: false, allowUnknown: true });

        if (result.error) {
            // Add error flash messages.
            req.flash('field_errors', Validator.getErrors(result.error.details));

            return res.redirect('/admin/user/' + (user.isNewRecord ? '-1' : user.id));
        }
        //result['value']['password'] = encryptor.encrypt(result['value']['password']);
        const cleaned_data = result.value;

        user.first_name         = cleaned_data.first_name;
        user.last_name          = cleaned_data.last_name;
        user.role               = cleaned_data.role;

        if(cleaned_data.email != null){
            user.email           = cleaned_data.email;
        }
        if(cleaned_data.password){
            user.password       = cleaned_data.password;
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
        req.user.getSurvey({
          include: [
            {
              model: SurveyAnswer,
              as: 'Answers'
            }
          ]
        })
        .then(survey => {
          res.render('user/form', { object: user, survey: survey});
        })
        .catch(err => {
          next(err);
        });
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
    }
    export(req, res, next){
        Object.defineProperty(Date.prototype, 'YYYYMMDDHHMMSS', {
            value: function() {
                function pad2(n) {
                    return (n < 10 ? '0' : '') + n;
                }
                return this.getFullYear() +
                    pad2(this.getMonth() + 1) +
                    pad2(this.getDate()) +
                    pad2(this.getHours()) +
                    pad2(this.getMinutes()) +
                    pad2(this.getSeconds());
            }
        });
        var now = new Date().YYYYMMDDHHMMSS();
        User.findAll({
            attributes:["id", "first_name", "last_name","email"]
        })
        .then(function (data) {
            const csvWriter = createCsvWriter({
                path: 'public/csv/user'+now+'.csv',
                header: [
                    {id: 'id', title: 'ID'},
                    {id: 'first_name', title: 'First Name'},
                    {id: 'last_name', title: 'Last Name'},
                    {id: 'email', title: 'Email'},
                ]
            });
            csvWriter
                .writeRecords(data)
                .then(message => console.log('The CSV file was written successfully: '+ message))
                .catch(error => {
                    console.log('Salio un error '+error)
                });
            res.redirect('/csv/user'+now+'.csv');
            return res.redirect('/admin/user');
        }).catch(error => {
            console.log(error)
        })
    }
}

module.exports = new UserAdminController();