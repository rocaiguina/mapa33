'use strict';

const Joi           = require('joi');
const Models        = require('../../db/models');
const Land          = Models.Land;

class LandController {

  findAll (req, res, next) {
    let area = req.query.area;
    let paramLevels = [];

    switch (area) {
      case 'proposed':
        paramLevels = ['basic', 'pledge'];
      break;
      case 'conserved':
        paramLevels = ['conserved'];
      break;
    }

    let query = `
      SELECT
        row_to_json ( fc ) AS geojson
        FROM (
          SELECT 
            'FeatureCollection' AS TYPE,
            array_to_json ( ARRAY_AGG ( f ) ) AS features
          FROM (
            SELECT 
              'Feature' AS TYPE,
              ST_AsGeoJSON ( ( lg.geom ), 15, 0 ) :: json AS geometry,
              row_to_json (( SELECT l FROM ( SELECT ID, name, entity, status, location, year_acquisition ) AS l )) AS properties
            FROM lands AS lg WHERE level IN (:levels)
          ) AS f
        ) AS fc
    `;

    Models
      .sequelize
      .query(query, 
        { 
          replacements: { levels: paramLevels },
          type: Models.sequelize.QueryTypes.SELECT
        }
      ).then(function (result) {
        if (result.length > 0 && result[0].geojson.features == null) {
          result[0].geojson.features = [];
        }
        res.send(result);
      })
      .catch(function (err) {
        res.send('');
      });
  }

  intersect (req, res, next) {
    Models
      .sequelize
      .query(`SELECT row_to_json ( fc ) AS geojson FROM ( SELECT 'FeatureCollection' AS TYPE, array_to_json ( ARRAY_AGG ( f ) ) AS features FROM ( SELECT 'Feature' AS TYPE, ST_AsGeoJSON ( ( lg.geom ), 15, 0 ) :: json AS geometry, row_to_json ( ( SELECT l FROM ( SELECT ID, num_catast, catastro, INITCAP( dir_fisica ) AS address, muni_norml AS municipality ) AS l ) ) AS properties FROM lots AS lg WHERE ST_Intersects ( lg.geom, ST_SETSRID ( ST_GeomFromGeoJSON ('${JSON.stringify(
            req.body.geom
        )}'), 4326 ) ) ) AS f ) AS fc`, 
        { type: Models.sequelize.QueryTypes.SELECT })
      .then(function (result) {
        console.dir(result);
        res.send(result);
      })
      .catch(function (err) {
        res.send('');
      });
  }

  select (req, res, next) {
    Models
      .sequelize
      .query(`SELECT row_to_json ( fc ) AS geojson FROM ( SELECT 'FeatureCollection' AS TYPE, array_to_json ( ARRAY_AGG ( f ) ) AS features FROM ( SELECT 'Feature' AS TYPE, ST_AsGeoJSON ( ( lg.geom ), 15, 0 ) :: json AS geometry, row_to_json ( ( SELECT l FROM ( SELECT id, num_catast, catastro, INITCAP( dir_fisica ) as address, muni_norml as municipality ) AS l ) ) AS properties FROM lots AS lg WHERE id IN ( ${req.body.id} ) ) AS f ) AS fc`, 
        { type: Models.sequelize.QueryTypes.SELECT })
      .then(function (result) {
        console.dir(result);
        res.send(result);
      })
      .catch(function (err) {
        res.send('');
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
      metadata:     Joi.object().required(),
      geom:         Joi.object({ type: Joi.string(), coordinates: Joi.array() }).required(),
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
        name:                  'undefined',
        level:                 'undefined',
        status:                'web',
        geom:                  cleaned_data.geom,
        metadata:              cleaned_data.metadata,
        location:              '',
        entity:                '',
        use_type:              '',
        acquisition_type:      '',
        year_acquisition:      '',
        reason_conservation:   ''
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
    
  // store (req, res, next) {
  //   var data = req.body;
  //   const validationSchema = {
  //     name:                 Joi.string().required(),
  //     level:                Joi.string().required(),
  //     status:               Joi.string().required(),
  //     geom:                 Joi.object({ type: Joi.string(), coordinates: Joi.array() }).required(),
  //     location:             Joi.string().required(),
  //     entity:               Joi.string().required(),
  //     use_type:             Joi.string().required(),
  //     acquisition_type:     Joi.string().required(),
  //     year_acquisition:     Joi.number().integer().required(),
  //     reason_conservation:  Joi.string().required()
  //   };

  //   // Validata data.
  //   const result = Joi.validate(data, validationSchema);

  //   if (result.error) {
  //     res.status(400).send(result.error);
  //     return next();
  //   }

  //   const cleaned_data = result.value;
    
  //   // Save new land.
  //   Land
  //     .create({
  //       name:                  cleaned_data.name,
  //       level:                 cleaned_data.level,
  //       status:                cleaned_data.status,
  //       geom:                  cleaned_data.geom,
  //       location:              cleaned_data.location,
  //       entity:                cleaned_data.entity,
  //       use_type:              cleaned_data.use_type,
  //       acquisition_type:      cleaned_data.acquisition_type,
  //       year_acquisition:      cleaned_data.year_acquisition,
  //       reason_conservation:   cleaned_data.reason_conservation
  //     })
  //     .then(function (land) {
  //       res.json(land.get({plain: true}));
  //     })
  //     .catch(function (err) {
  //       res.status(400).send(err);
  //     })
  //     .finally(function () {
  //       next();
  //     });
  // }

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
