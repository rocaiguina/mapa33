'use strict';

const Base64Img = require('base64-img');
const Joi = require('joi');
const Sequelize = require('sequelize');
const Models = require('../../db/models');
const RandomToken = require('random-token');
const Land = Models.Land;
const User = Models.User;
const LandLikes = Models.LandLikes;
const Op = Sequelize.Op;

const jwt = require('jsonwebtoken');
const TemplateEngine = require('../utils/template-engine');
const sgMail = require('@sendgrid/mail');

const PROPOSED_LAND_LEVELS = ['basic', 'pledge'];
const CONSERVED_LAND_LEVELS = ['conserved'];

class LandController {
  findAll(req, res) {
    let level = req.query.level;
    let location = req.query.location;

    let conditions = {};

    switch (level) {
      case 'proposed':
        conditions.level = {
          [Op.in]: PROPOSED_LAND_LEVELS,
        };
        conditions.status = 'approved';
        break;
      case 'conserved':
        conditions.level = {
          [Op.in]: CONSERVED_LAND_LEVELS,
        };
        break;
    }

    if (location) {
      conditions.location = {
        [Op.like]: '%' + location,
      };
    }

    Land.findAll({
      where: conditions,
      attributes: { exclude: ['geom'] },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name'],
        },
      ],
    })
      .then(function(lands) {
        res.send(lands);
      })
      .catch(function(err) {
        res.status(400).send(err);
      });
  }

  findGeoJson(req, res) {
    let area = req.query.area;
    let paramLevels = [];
    let extraConditions = '';

    switch (area) {
      case 'proposed':
        paramLevels = PROPOSED_LAND_LEVELS;
        extraConditions = 'AND status=\'approved\'';
        break;
      case 'conserved':
        paramLevels = CONSERVED_LAND_LEVELS;
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
            FROM lands AS lg WHERE level IN (:levels) ${extraConditions}
          ) AS f
        ) AS fc
    `;

    Models.sequelize
      .query(query, {
        replacements: { levels: paramLevels },
        type: Models.sequelize.QueryTypes.SELECT,
      })
      .then(function(result) {
        if (result.length > 0 && result[0].geojson.features == null) {
          result[0].geojson.features = [];
        }
        res.send(result);
      })
      .catch(function(err) {
        res.send(err);
      });
  }

  intersect(req, res) {
    Models.sequelize
      .query(
        `SELECT row_to_json ( fc ) AS geojson FROM ( SELECT 'FeatureCollection' AS TYPE, array_to_json ( ARRAY_AGG ( f ) ) AS features FROM ( SELECT 'Feature' AS TYPE, ST_AsGeoJSON ( ( lg.geom ), 15, 0 ) :: json AS geometry, row_to_json ( ( SELECT l FROM ( SELECT ID, num_catast, catastro, INITCAP( dir_fisica ) AS address, muni_norml AS municipality ) AS l ) ) AS properties FROM lots AS lg WHERE ST_Intersects ( lg.geom, ST_SETSRID ( ST_GeomFromGeoJSON ('${JSON.stringify(
          req.body.geom
        )}'), 4326 ) ) ) AS f ) AS fc`,
        { type: Models.sequelize.QueryTypes.SELECT }
      )
      .then(function(result) {
        res.send(result);
      })
      .catch(function(err) {
        res.send(err);
      });
  }

  select(req, res) {
    Models.sequelize
      .query(
        `SELECT row_to_json ( fc ) AS geojson FROM ( SELECT 'FeatureCollection' AS TYPE, array_to_json ( ARRAY_AGG ( f ) ) AS features FROM ( SELECT 'Feature' AS TYPE, ST_AsGeoJSON ( ( lg.geom ), 15, 0 ) :: json AS geometry, row_to_json ( ( SELECT l FROM ( SELECT id, num_catast, catastro, INITCAP( dir_fisica ) as address, muni_norml as municipality ) AS l ) ) AS properties FROM lots AS lg WHERE id IN ( ${req.body.id} ) ) AS f ) AS fc`,
        { type: Models.sequelize.QueryTypes.SELECT }
      )
      .then(function(result) {
        console.dir(result);
        res.send(result);
      })
      .catch(function(err) {
        res.send(err);
      });
  }

  lookup(req, res, next) {
    Land.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ['geom'] },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name','email'],
        },
      ],
    })
      .then(function(land) {
        if (!land) {
          return res.status(404).send('');
        }

        req.land = land;
        next();
      })
      .catch(function(err) {
        res.status(400).send(err);
      });
  }

  store(req, res, next) {
    var data = req.body;
    const validationSchema = {
      are_u_owner: Joi.boolean().allow(null),
      catastro_numbers: Joi.array(),
      owner_name: Joi.string(),
      owner_email: Joi.string().allow(null, ''),
      owner_phone: Joi.string().allow(null, ''),
      inheritance_land: Joi.boolean().allow(null),
      inheritance_agree: Joi.boolean().allow(null),
      lands_problem: Joi.array(),
      lands_other_problem: Joi.string().allow(null, ''),
      has_mortgage: Joi.boolean().allow(null),
      has_surveying: Joi.boolean().allow(null),
      lands_main_uses: Joi.array(),
      lands_other_main_uses: Joi.string().allow(null, ''),
      lands_structures: Joi.array(),
      lands_other_structures: Joi.string().allow(null, ''),
      lands_attributes: Joi.array(),
      lands_other_attributes: Joi.string().allow(null, ''),
      has_contamination: Joi.boolean().allow(null),
      wich_use: Joi.string().allow(null, ''),
      importance_of_knowing: Joi.string().allow(null, ''),
      know_owner: Joi.boolean().allow(null),
      geojson: Joi.object({
        geometry: Joi.object({
          type: Joi.string(),
          coordinates: Joi.array(),
        }),
      }).required(),
      coordinates: Joi.object({
        type: Joi.string(),
        coordinates: Joi.array(),
      }).required(),
      area_size: Joi.number(),
      plots_count: Joi.number(),
      land_name: Joi.string().required(),
      location: Joi.string().allow(null, ''),
    };

    // Validata data.
    const result = Joi.validate(data, validationSchema, {
      allowUnknown: true,
      abortEarly: false,
    });

    if (result.error) {
      res.status(400).send(result.error);
      return next();
    }

    const cleaned_data = result.value;

    // Save new land.
    Land.create({
      name: cleaned_data.land_name,
      level: 'basic',
      photograph: req.photograph_filepath,
      location: cleaned_data.location,
      main_attributes: cleaned_data.lands_attributes,
      other_main_attributes: cleaned_data.lands_other_attributes,
      main_uses: cleaned_data.lands_main_uses,
      other_main_uses: cleaned_data.lands_other_main_uses,
      proposed_uses: [cleaned_data.wich_use],
      coordinates: cleaned_data.coordinates,
      geom: cleaned_data.geojson.geometry,
      metadata: {
        are_u_owner: cleaned_data.are_u_owner,
        catastro_numbers: cleaned_data.catastro_numbers,
        owner_name: cleaned_data.owner_name,
        owner_email: cleaned_data.owner_email,
        owner_phone: cleaned_data.owner_phone,
        inheritance_land: cleaned_data.inheritance_land,
        inheritance_agree: cleaned_data.inheritance_agree,
        lands_problem: cleaned_data.lands_problem,
        lands_other_problem: cleaned_data.lands_other_problem,
        has_mortgage: cleaned_data.has_mortgage,
        has_surveying: cleaned_data.has_surveying,
        lands_structures: cleaned_data.lands_structures,
        lands_other_structures: cleaned_data.lands_other_structures,
        has_contamination: cleaned_data.has_contamination,
        know_owner: cleaned_data.know_owner,
      },
      plots_count: cleaned_data.plots_count,
      area_size: cleaned_data.area_size,
      area_type: 'terrestre',
      likes: 0,
      entity: '',
      use_type: '',
      acquisition_type: '',
      year_estab: '',
      year_acquisition: '',
      reason_conservation: cleaned_data.importance_of_knowing,
      user_id: cleaned_data.are_u_owner ? req.user.id : null,
      ownership: '',
      notes: '',
      status: 'new',
    })
      .then(function(land) {
        // Calculate coordinate.
        const result = land.get({ plain: true });
        delete result.geom;
          // variables para email
        const contacto = process.env.SERVER_URL +'/contact-us'
        const html = TemplateEngine.render(
          'template_email/create_land_email.html',
          {contact: contacto }
        );
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: req.user.email,
            from: process.env.DEFAULT_EMAIL_FROM,
            subject: '¡Gracias por llenar el formulario para el Mapa-33!',
            html: html,
        }
        sgMail.send(msg).
        then(() => {}, error => {
            console.error(error);
            if (error.response) {
              console.error(error.response.body)
            }
        }); 
        res.json(result);
      })
      .catch(function(err) {
        res.status(400).send(err);
      });
  }

  storePhotograph(req, res, next) {
    if (req.body.base64Img) {
      let filename = RandomToken(10);
      Base64Img.img(
        req.body.base64Img,
        'public/uploads/lands',
        filename,
        function(err, filepath) {
          if (err) {
            return next(err);
          }

          req.photograph_filepath = filepath.replace('public', '');
          next();
        }
      );
    } else {
      next();
    }
  }

  update(req, res, next) {
    var data = req.body;
    const validationSchema = {
      name: Joi.string().required(),
      level: Joi.string().required(),
      status: Joi.string().required(),
      geom: Joi.object({
        type: Joi.string(),
        coordinates: Joi.array(),
      }).required(),
      location: Joi.string().required(),
      entity: Joi.string().required(),
      use_type: Joi.string().required(),
      acquisition_type: Joi.string().required(),
      year_acquisition: Joi.number()
        .integer()
        .required(),
      reason_conservation: Joi.string().required(),
    };

    // Validata data.
    const result = Joi.validate(data, validationSchema);

    if (result.error) {
      res.status(400).send(result.error);
      return next();
    }

    const cleaned_data = result.value;

    var land = req.land;

    land.level = cleaned_data.level;
    land.status = cleaned_data.status;
    land.geom = cleaned_data.geom;
    land.location = cleaned_data.location;
    land.entity = cleaned_data.entity;
    land.use_type = cleaned_data.use_type;
    land.acquisition_type = cleaned_data.acquisition_type;
    land.year_acquisition = cleaned_data.year_acquisition;
    land.reason_conservation = cleaned_data.reason_conservation;

    land
      .save()
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

  get(req, res, next) {
    var land = req.land;
    console.log("ESto es land2: " + req.land );
    res.json(land.get({ plain: true }));
    next();
  }

  remove(req, res, next) {
    var land = req.land;

    land
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

  checkUserLike(req, res) {
    let user_id = '-1';
    if (req.user) {
      user_id = req.user.id;
    }
    LandLikes.findOne({
      where: {
        land_id: req.params.id,
        user_id: user_id,
      },
    })
      .then(function(landlike) {
        if (landlike != null) {
          return res.json(landlike.get({ plain: true }));
        }
        res.json(null);
      })
      .catch(function(err) {
        res.status(400).send(err);
      });
  }

  like(req, res) {
    LandLikes.findOne({
      where: {
        land_id: req.params.id,
        user_id: req.user.id,
      },
    })
      .then(function(landlike) {
        if (landlike) {
          return res.json(landlike.get({ plain: true }));
        }
        Land.increment('likes', { 
            where: { id: req.params.id }
        }).then(function(land) {
            var land1 = land[0];
            var land2 = land1[0];
            var land3 = land2[0];
             
            if(land3.likes % 100 == 0  ){
                
                User.findOne({
                    where: {
                       id: land3.user_id
                    }
                 }).then(function(user) {
                    console.log("USER: "+JSON.stringify(user))
                    const sitio = process.env.SERVER_URL + '/land/'+req.params.id;
                    const name = user.first_name+" "+ user.last_name;
                    const html = TemplateEngine.render(
                        'template_email/follow_up_email.html',
                        {name: name, site: sitio}
                    );
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                    const msg = {
                        to: user.email,
                        from: process.env.DEFAULT_EMAIL_FROM,
                        subject: '¡Celebramos tus logros!',
                        html: html,
                    }
                    sgMail.send(msg).
                    then(() => {}, error => {
                        if (error.response) {
                            console.error(error.response.body)
                        }
                    }); 
                })
            }  
            return LandLikes.create({
              land_id: req.params.id,
              user_id: req.user.id,
              liked_at: new Date(),
            });
          })
          .then(function(created) {
            res.json(created.get({ plain: true }));
          })
          .catch(function(err) {
            res.status(400).send(err);
          });
      })
      .catch(function(err) {
        res.status(400).send(err);
      });
  }
}

module.exports = new LandController();
