'use strict';

const Joi           = require('joi');
const Models        = require('../../db/models');
const Land          = Models.Land;

class LandController {

  findAll (req, res, next) {
    Land
      .findAll({ raw: true })
      .then(function (lands) {
        res.json({ data: lands });
      })
      .catch(function (err) {
        res.status(400).send(err);
      })
      .finally(function () {
        next();
      });    
  }

  lookup (req, res, next) {
    Land
      .findOne({ where: { id: req.params.id } })
      .then(function (land) {
        if (!land) { return res.status(404).send(''); }

        req.land = land;
        next();
      })
      .catch(function (err) {
        res.status(400).send(err);
      });
  }
    
  store (req, res, next) {
    var data = req.body;
    const validationSchema = {
      name:                 Joi.string().required(),
      level:                Joi.string().required(),
      status:               Joi.string().required(),
      geom:                 Joi.object({ type: Joi.string(), coordinates: Joi.array() }).required(),
      location:             Joi.string().required(),
      entity:               Joi.string().required(),
      use_type:             Joi.string().required(),
      acquisition_type:     Joi.string().required(),
      year_acquisition:     Joi.number().integer().required(),
      reason_conservation:  Joi.string().required()
    };

    // Validata data.
    const result = Joi.validate(data, validationSchema);

    if (result.error) {
      res.status(400).send(result.error);
      return next();
    }

    const cleaned_data = result.value;
    
    // Save new land.
    Land
      .create({
        name:                  cleaned_data.name,
        level:                 cleaned_data.level,
        status:                cleaned_data.status,
        geom:                  cleaned_data.geom,
        location:              cleaned_data.location,
        entity:                cleaned_data.entity,
        use_type:              cleaned_data.use_type,
        acquisition_type:      cleaned_data.acquisition_type,
        year_acquisition:      cleaned_data.year_acquisition,
        reason_conservation:   cleaned_data.reason_conservation
      })
      .then(function (land) {
        res.json(land.get({plain: true}));
      })
      .catch(function (err) {
        res.status(400).send(err);
      })
      .finally(function () {
        next();
      });
  }

  update (req, res, next) {
    var data = req.body;
    const validationSchema = {
      name:                 Joi.string().required(),
      level:                Joi.string().required(),
      status:               Joi.string().required(),
      geom:                 Joi.object({ type: Joi.string(), coordinates: Joi.array() }).required(),
      location:             Joi.string().required(),
      entity:               Joi.string().required(),
      use_type:             Joi.string().required(),
      acquisition_type:     Joi.string().required(),
      year_acquisition:     Joi.number().integer().required(),
      reason_conservation:  Joi.string().required()
    };

    // Validata data.
    const result = Joi.validate(data, validationSchema);

    if (result.error) {
      res.status(400).send(result.error);
      return next();
    }

    const cleaned_data = result.value;

    var land = req.land;

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
    var land = req.land;
    res.json(land.get({plain: true}));
    next();
  }

  remove (req, res, next) {
    var land = req.land;

    land
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

module.exports = new LandController();
