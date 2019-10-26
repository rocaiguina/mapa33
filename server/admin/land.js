'use strict';

const Joi           = require('joi');
const Paginator     = require('paginator');

const Models        = require('../../db/models');
const Land          = Models.Land;
const Validator     = require('../utils/validator');


class LandAdminController {
  findAll (req, res, next) {
    let options = {
      page: req.query.page || 1,
      paginate: req.query.limit || 10
    };

    Land
      .paginate(options)
      .then(function (data) {
        let paginator = new Paginator(options.paginate, 5).build(data.total, options.page);
        data.current_page = paginator.current_page;
        data.next_page = paginator.next_page;
        data.previous_page = paginator.previous_page;
        data.has_previous_page = paginator.has_previous_page;
        data.has_next_page = paginator.has_next_page;
        res.render('land/index', { paginator: data });
      })
      .catch(function (err) {
        next(err);
      });
  }

  save (req, res, next) {
    var land = req.land;
    var data = req.body;
    const validationSchema = {
      name:                 Joi.string().required(),
      level:                Joi.string().required(),
      status:               Joi.string().required(),
      location:             Joi.string().required(),
      entity:               Joi.string().required(),
      use_type:             Joi.string().required(),
      acquisition_type:     Joi.string().required(),
      year_acquisition:     Joi.number().integer().required(),
      reason_conservation:  Joi.string().required()
    };

    // Validata data.
    const result = Joi.validate(data, validationSchema, { abortEarly: false, allowUnknown: true });

    if (result.error) {
      // Add error flash messages.
      req.flash('field_errors', Validator.getErrors(result.error.details));

      return res.redirect('/admin/land/' + (land.isNewRecord ? '-1' : land.id));
    }

    const cleaned_data = result.value;

    land.name                 = cleaned_data.name;
    land.level                = cleaned_data.level;
    land.status               = cleaned_data.status;
    land.geom                 = cleaned_data.geom;
    land.location             = cleaned_data.location;
    land.entity               = cleaned_data.entity;
    land.use_type             = cleaned_data.use_type;
    land.acquisition_type     = cleaned_data.acquisition_type;
    land.year_acquisition     = cleaned_data.year_acquisition;
    land.reason_conservation  = cleaned_data.reason_conservation;

    land
      .save()
      .then(function () {
        req.flash('success', 'Your data has been saved.');
      })
      .catch(function (err) {
        req.flash('error', err.message);
      })
      .finally(function () {
        res.redirect('/admin/land/' + land.id);
      });
  }

  get (req, res, next) {
    let land = req.land.get({plain: true});
    res.render('land/form', { object: land });
  }

  remove (req, res, next) {
    var land = req.land;

    land
      .destroy()
      .then(function () {
        res.redirect('/admin/land');
      })
      .catch(function (err) {
        next(err);
      });
  }
}

module.exports = new LandAdminController();
