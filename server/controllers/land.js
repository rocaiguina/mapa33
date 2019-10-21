'use strict';

const Joi           = require('joi');
const Models        = require('../../db/models');
const Land          = Models.Land;

class LandController {

  findAll (req, res, next) {
    res.send('');
    next();
  }
    
  store (req, res, next) {
    var data = req.body;
    const validationSchema = {
      level:                Joi.string(),
      status:               Joi.string(),
      use_type:             Joi.string(),
      acquisition_type:     Joi.string(),
      year_acquisition:     Joi.number().integer(),
      reason_conservation:  Joi.string()
    };

    // Validata data.
    const result = Joi.validate(data, validationSchema);

    if (result.error) {
      res.send(400, error);
      return next();
    }

    const cleaned_data = result.value;
    
    // Save new land.
    Land
      .create({
        level:                 cleaned_data.level,
        status:                cleaned_data.status,
        use_type:              cleaned_data.use_type,
        acquisition_type:      cleaned_data.acquisition_type,
        year_acquisition:      cleaned_data.year_acquisition,
        reason_conservation:   cleaned_data.reason_conservation
      })
      .then(function (land) {
        res.json(land.get({plain: true}));
      })
      .catch(function (err) {
        res.status(400);
        res.send(err);
      })
      .finally(function () {
        next();
      });
  }

  update (req, res, next) {
    var data = req.body;
    const validationSchema = {
      level:                Joi.string(),
      status:               Joi.string(),
      use_type:             Joi.string(),
      acquisition_type:     Joi.string(),
      year_acquisition:     Joi.number().integer(),
      reason_conservation:  Joi.string()
    };

    // Validata data.
    const result = Joi.validate(data, validationSchema);

    if (result.error) {
      res.send(400, error);
      return next();
    }

    const cleaned_data = result.value;

    Land
      .findOne({ where: { id: req.params.id } })
      .then(function (land) {
        if (!land) {
          res.send(404);
          return next();
        }

        land.level                = cleaned_data.level;
        land.status               = cleaned_data.status;
        land.use_type             = cleaned_data.use_type;
        land.acquisition_type     = cleaned_data.acquisition_type;
        land.year_acquisition     = cleaned_data.year_acquisition;
        land.reason_conservation  = cleaned_data.reason_conservation;

        return land.save();
      })
      .then(function () {
        res.send(200, '');
      })
      .catch(function (err) {
        res.send(400, err);
      })
      .finally(function () {
        next();
      });;
  }

  get (req, res, next) {
    Land
      .findOne({ where: { id: req.params.id } })
      .then(function (land) {
        if (!land) { return res.send(404); }

        res.json(land.get({plain: true}));
      })
      .catch(function (err) {
        res.send(400, err);
      })
      .finally(function () {
        next();
      });
  }

  remove (req, res, next) {
    Land
      .findOne({ where: { id: req.params.id } })
      .then(function (land) {
        if (!land) { return res.send(404); }

        return land.destroy();
      })
      .then(function () {
        res.send(200, '');
      })
      .catch(function (err) {
        res.send(400, err);
      })
      .finally(function () {
        next();
      });
  }

}

module.exports = new LandController();
