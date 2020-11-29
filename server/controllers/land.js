'use strict';

const Path = require('path');
const Joi = require('joi');
const Paginator = require('paginator');
const RandomToken = require('random-token');
const Sequelize = require('sequelize');
const sgMail = require('@sendgrid/mail');
const sharp = require('sharp');
const Base64Img = require('../utils/base64-img');
const Models = require('../../db/models');
const FileStorage = require('../utils/file-storage');
const { LAND_PROTECTION_REASONS } = require('../../config/constants');

const Land = Models.Land;
const User = Models.User;
const LandLikes = Models.LandLikes;
const Op = Sequelize.Op;

const ALL_LAND_LEVELS = ['basic', 'pledge', 'conserved'];
const PROPOSED_LAND_LEVELS = ['basic', 'pledge'];
const CONSERVED_LAND_LEVELS = ['conserved'];

class LandController {
  find(req, res) {
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
      default:
        conditions.level = {
          [Op.in]: ALL_LAND_LEVELS,
        };
        conditions.status = 'approved';
        break;
    }

    if (location) {
      conditions.location = {
        [Op.like]: '%' + location,
      };
    }

    const options = {
      page: req.query.page || 1,
      paginate: req.query.limit || 10,
      where: conditions,
      attributes: { exclude: ['geom'] },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name'],
        },
      ],
    };

    Land.paginate(options)
      .then(function(data) {
        let paginator = new Paginator(options.paginate, 5).build(
          data.total,
          options.page
        );
        data.current_page = paginator.current_page;
        data.next_page = paginator.next_page;
        data.previous_page = paginator.previous_page;
        data.has_previous_page = paginator.has_previous_page;
        data.has_next_page = paginator.has_next_page;
        res.json(data);
      })
      .catch(function(err) {
        res.status(400).send(err);
      });
    // Land.findAll({
    //   where: conditions,
    //   attributes: { exclude: ['geom'] },
    //   include: [
    //     {
    //       model: User,
    //       as: 'user',
    //       attributes: ['first_name', 'last_name'],
    //     },
    //   ],
    // })
    //   .then(function(lands) {
    //     res.send(lands);
    //   })
    //   .catch(function(err) {
    //     res.status(400).send(err);
    //   });
  }

  findGeoJson(req, res) {
    let level = req.query.area;

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

    Land.findAll({
      attributes: [
        'id',
        'name',
        'likes',
        'level',
        'status',
        'geom',
        'photograph',
        'createdAt',
      ],
      where: conditions,
    })
      .then(function(lands) {
        let response = {
          geojson: {
            type: 'FeatureCollection',
            features: [],
          },
        };
        lands.forEach(function(item) {
          const properties = item.get({ plain: true });
          delete properties.geom;
          var row = {
            type: 'Feature',
            geometry: item.geom,
            properties: properties,
          };
          response.geojson.features.push(row);
        });

        res.send([response]);
      })
      .catch(function(err) {
        res.status(400).send(err);
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
          attributes: ['first_name', 'last_name', 'email'],
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

  validateStoreRequest(req, res, next) {
    var data = req.body;
    const validationSchema = {
      are_u_owner: Joi.boolean().allow(null),
      catastro_numbers: Joi.array(),
      owner_name: Joi.string().allow(null, ''),
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
      has_contamination: Joi.string().allow(null, ''),
      which_uses: Joi.array(),
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
      return res.status(400).send(result.error);
    }

    req.cleaned_data = result.value;
    return next();
  }

  store(req, res) {
    const cleaned_data = req.cleaned_data;

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
      proposed_uses: cleaned_data.which_uses,
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
      reason_conservation:
        LAND_PROTECTION_REASONS[cleaned_data.importance_of_knowing] || '',
      user_id: req.user.id,
      ownership: cleaned_data.are_u_owner ? cleaned_data.are_u_owner : null,
      notes: '',
      status: 'new',
    })
      .then(function(land) {
        // Calculate coordinate.
        const result = land.get({ plain: true });
        delete result.geom;
        // variables para email
        const createLandTemplateId = "d-3a8e6bb92266433f9f60bcae4e62540f";
        const contacto = process.env.SERVER_URL + '/contact-us';
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: req.user.email,
          from: process.env.DEFAULT_EMAIL_FROM,
          templateId: createLandTemplateId,
          dynamic_template_data: {
          contact: contacto,
         }
        };
        sgMail.send(msg).then(
          () => {},
          error => {
            console.error(error);
            if (error.response) {
              console.error(error.response.body);
            }
          }
        );
        res.json(result);
      })
      .catch(function(err) {
        res.status(400).send(err);
      });
  }

  storePhotograph(req, res, next) {
    if (req.body.base64Img) {
      const image = Base64Img.img(req.body.base64Img);
      const filename = RandomToken(10) + '.jpg';
      const filepath = `lands/${filename}`;
      // Resize image
      const input = Buffer.from(image.base64, 'base64');
      sharp(input)
        .resize(480, 320)
        .toFormat('jpg')
        .toBuffer()
        .then(newImage => {
          // Store image
          FileStorage.put(filepath, newImage)
            .then(function(response) {
              req.photograph_filepath = response;
              next();
            })
            .catch(function(err) {
              next(err);
            });
        })
        .catch(function(err) {
          next(err);
        });
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
    const landId = req.params.id;
    Land.findOne({
      where: { id: landId },
      attributes: { exclude: ['geom'] },
    })
      .then(function (land) {
        if (!land) {
          return res.status(404).send();
        }

        LandLikes.findOne({
          where: {
            land_id: landId,
            user_id: req.user.id,
          },
        })
          .then(function(landlike) {
            if (landlike) {
              return res.json({
                ...landlike.get({ plain: true }),
                totalLikes: land.likes,
              });
            }
            Land.increment('likes', {
              where: { id: req.params.id },
            })
              .then(function() {
                if ((land.likes + 1) % 100 == 0) {
                  User.findOne({
                    where: { id: land.user_id },
                  }).then(function(user) {
                    const followUpTemplateId = "d-48aaa5ef91144316b0212d9bce04eeea";
                    const site = process.env.SERVER_URL + '/land/' + req.params.id;
                    const name = user.first_name + ' ' + user.last_name;
                    const proposalName = land.name;
                    const likes = land.likes;

                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                    const msg = {
                      to: user.email,
                      from: process.env.DEFAULT_EMAIL_FROM,
                      templateId: followUpTemplateId,
                      dynamic_template_data: {
                        name: name, 
                        site: site,
                        proposal_name: proposalName,
                        likes: likes,
                      }
                    };
                    sgMail.send(msg).then(
                      () => {},
                      error => {
                        if (error.response) {
                          console.error(error.response.body);
                        }
                      }
                    );
                  });
                }
                return LandLikes.create({
                  land_id: req.params.id,
                  user_id: req.user.id,
                  liked_at: new Date(),
                });
              })
              .then(function(created) {
                res.json({
                  ...created.get({ plain: true }),
                  totalLikes: land.likes + 1,
                });
              })
              .catch(function(err) {
                res.status(400).send(err);
              });
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
