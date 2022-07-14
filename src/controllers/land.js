'use strict';

const Joi = require('joi');
const Mime = require('mime-types');
const Paginator = require('paginator');
const RandomToken = require('random-token');
const Sequelize = require('sequelize');
const sgMail = require('@sendgrid/mail');
const sharp = require('sharp');
const Base64Img = require('../utils/base64-img');
const Models = require('../../db/models');
const FileStorage = require('../utils/file-storage');
const LandImageCreator = require('../utils/land-image-creator');
const Subscriptions = require('../utils/subscriptions');
const { LAND_STATUS, SENDGRID_TEMPLATES } = require('../../config/constants');

const Land = Models.Land;
const User = Models.User;
const LandLikes = Models.LandLikes;
const Op = Sequelize.Op;

const ALL_LAND_LEVELS = ['basic', 'pledge', 'conserved'];
const PROPOSED_LAND_LEVELS = ['basic', 'pledge'];
const CONSERVED_LAND_LEVELS = ['conserved'];

const LAND_STATUS_APPROVED = LAND_STATUS[2]['value'];

class LandController {
  findAutoComplete(req, res) {
    let q = req.query.q;
    let conditions = {};
    if (q) {
      conditions.name = {
        [Op.iLike]: '%' + q + '%',
      };
    }

    Land.findAll({
      where: conditions,
      attributes: ['id', 'name'],
      order: [['name', 'ASC']],
    })
      .then(function(lands) {
        res.send(lands);
      })
      .catch(function(err) {
        res.status(400).send(err);
      });
  }

  find(req, res) {
    let { keywords, level, location, area_size, use_type } = req.query;

    let conditions = {};
    const order = [['name', 'ASC']];

    if (keywords) {
      conditions.name = {
        [Op.iLike]: '%' + keywords + '%',
      };
    }

    switch (level) {
      case 'proposed':
        conditions.level = {
          [Op.in]: PROPOSED_LAND_LEVELS,
        };
        conditions.status = LAND_STATUS_APPROVED;
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
        conditions.status = LAND_STATUS_APPROVED;
        break;
    }

    if (location) {
      conditions.location = {
        [Op.like]: '%' + location,
      };
    }

    if (use_type) {
      conditions.main_uses = {
        [Op.contains]: [use_type],
      };
    }

    if (area_size) {
      order[0] = ['area_size', area_size];
    }

    const options = {
      page: req.query.page || 1,
      paginate: req.query.limit || 10,
      where: conditions,
      order,
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
  }

  findGeoJson(req, res) {
    let level = req.query.area;

    let conditions = {};

    switch (level) {
      case 'proposed':
        conditions.level = {
          [Op.in]: PROPOSED_LAND_LEVELS,
        };
        conditions.status = LAND_STATUS_APPROVED;
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
        'slug',
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
    const where = /^\d+$/.test(req.params.id)
      ? { id: req.params.id }
      : { slug: req.params.id };
    Land.findOne({
      where,
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
      owner_name: Joi.string().allow(null, ''),
      owner_email: Joi.string().allow(null, ''),
      owner_phone: Joi.string().allow(null, ''),
      lands_main_uses: Joi.array(),
      lands_other_main_uses: Joi.string().allow(null, ''),
      lands_structures: Joi.array(),
      lands_other_structures: Joi.string().allow(null, ''),
      lands_attributes: Joi.array(),
      lands_other_attributes: Joi.string().allow(null, ''),
      has_already_proposed_uses: Joi.string().allow(null, ''),
      proposed_uses_description: Joi.string().allow(null, ''),
      has_contamination: Joi.string().allow(null, ''),
      contamination_description: Joi.string().allow(null, ''),
      has_controversies: Joi.string().allow(null, ''),
      controversies_description: Joi.string().allow(null, ''),
      which_uses: Joi.array(),
      importance_of_protection: Joi.string().allow(null, ''),
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
        owner_name: cleaned_data.owner_name,
        owner_email: cleaned_data.owner_email,
        owner_phone: cleaned_data.owner_phone,
        lands_structures: cleaned_data.lands_structures,
        lands_other_structures: cleaned_data.lands_other_structures,
        has_contamination: cleaned_data.has_contamination,
        contamination_description: cleaned_data.contamination_description,
        has_controversies: cleaned_data.has_controversies,
        controversies_description: cleaned_data.controversies_description,
        know_owner: cleaned_data.know_owner,
        importance_of_protection: cleaned_data.importance_of_protection,
        has_already_proposed_uses: cleaned_data.has_already_proposed_uses,
        proposed_uses_description: cleaned_data.proposed_uses_description,
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
      reason_conservation: cleaned_data.importance_of_knowing || '',
      user_id: req.user.id,
      ownership: cleaned_data.are_u_owner ? cleaned_data.are_u_owner : null,
      notes: '',
      status: LAND_STATUS_APPROVED,
    })
      .then(function(land) {
        // Create social and landshap photograph
        Promise.all([
          LandImageCreator.createSocialPhotograp(land),
          LandImageCreator.createLandShapePhotograph(land),
        ])
          .then(function(photos) {
            const [socialPhotographUrl, landShapePhotographUrl] = photos;

            if (socialPhotographUrl) {
              land.social_photograph = socialPhotographUrl;
            }

            if (landShapePhotographUrl) {
              land.land_shape = landShapePhotographUrl;
            }

            land
              .save()
              .then(() => {})
              .catch(err => {
                console.error(err);
              });
          })
          .catch(err => {
            console.error(err);
          });

        // Send email notification
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const landUrl = `${process.env.SERVER_URL}/land/${land.id}`;
        const mailOptions = {
          to: req.user.email,
          from: process.env.DEFAULT_EMAIL_FROM, // list of receivers
          templateId: SENDGRID_TEMPLATES.LAND_APPROVED,
          dynamic_template_data: {
            site: process.env.SERVER_URL,
            fullname: req.user.first_name,
            landUrl,
            landPhotograph: FileStorage.getUrl(land.photograph),
            landFacebookShareUrl: `https://www.facebook.com/sharer.php?u=${landUrl}`,
            landTwitterShareUrl: `https://twitter.com/intent/tweet?url=${landUrl}`,
            landWhatsappShareUrl: `whatsapp://send?text=${landUrl}`,
            landEmailShareUrl: `mailto:?subject=I wanted you to see this site&amp;body=Check out this site ${landUrl}`,
          },
        };
        sgMail.send(mailOptions).then(
          () => {},
          error => {
            console.error(error);
          }
        );

        // Update subscription
        Subscriptions.create({
          email: req.user.email,
          proponente: 'yes',
          propietario: land.metadata.are_u_owner ? 'yes' : 'no',
          usosPropuestos: land.proposed_uses.join(', '),
        })
          .then(() => {})
          .catch(err => {
            console.error(err);
          });

        // variables para email
        // const createLandTemplateId = 'd-3a8e6bb92266433f9f60bcae4e62540f';
        // const contacto = process.env.SERVER_URL + '/contact-us';
        // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        // const msg = {
        //   to: req.user.email,
        //   from: process.env.DEFAULT_EMAIL_FROM,
        //   templateId: createLandTemplateId,
        //   dynamic_template_data: {
        //     contact: contacto,
        //   },
        // };
        // sgMail.send(msg).then(
        //   () => {},
        //   error => {
        //     console.error(error);
        //     if (error.response) {
        //       console.error(error.response.body);
        //     }
        //   }
        // );

        const result = land.get({ plain: true });
        delete result.geom;
        res.json(result);
      })
      .catch(function(err) {
        console.dir(err, { depth: 10 });
        res.status(400).send(err);
      });
  }

  storePhotograph(req, res, next) {
    if (req.body.base64Img) {
      const image = Base64Img.img(req.body.base64Img);
      const filename = RandomToken(10) + '.jpg';
      const filepath = `lands/${filename}`;
      const fileOpts = {
        ContentType: Mime.lookup(filename),
      };
      // Resize image
      const input = Buffer.from(image.base64, 'base64');
      sharp(input)
        .resize(480, 320)
        .toFormat('jpg')
        .toBuffer()
        .then(newImage => {
          // Store image
          FileStorage.put(filepath, newImage, fileOpts)
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

  update(req, res) {
    const data = req.body;
    const validationSchema = {
      name: Joi.string().allow(null, ''),
      reason_conservation: Joi.string().allow(null, ''),
      proposed_uses: Joi.array().allow(null),
      main_attributes: Joi.array().allow(null),
      other_main_attributes: Joi.string().allow(null, ''),
    };

    // Validata data.
    const result = Joi.validate(data, validationSchema);

    if (result.error) {
      return res.status(400).send(result.error);
    }

    const cleaned_data = result.value;

    const land = req.land;

    if (req.user.role !== 'administrator' && req.user.id !== land.user_id) {
      return res.status(401).send('Unauthorized');
    }

    if (cleaned_data.name) {
      land.name = cleaned_data.name;
    }

    if (cleaned_data.reason_conservation) {
      land.reason_conservation = cleaned_data.reason_conservation;
    }

    if (cleaned_data.proposed_uses) {
      land.proposed_uses = cleaned_data.proposed_uses;
    }

    if (cleaned_data.main_attributes) {
      land.main_attributes = cleaned_data.main_attributes;
      land.other_main_attributes = cleaned_data.other_main_attributes;
    }

    land
      .save()
      .then(function() {
        res.send('');
      })
      .catch(function(err) {
        res.status(400).send(err);
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
      .then(function(land) {
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
                if ((land.likes + 1) % 25 == 0) {
                  User.findOne({
                    where: { id: land.user_id },
                  }).then(function(user) {
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                    const msg = {
                      to: user.email,
                      from: process.env.DEFAULT_EMAIL_FROM,
                      templateId: SENDGRID_TEMPLATES.LAND_FOLLOW_UP,
                      dynamic_template_data: {
                        fullname: user.first_name,
                        site: process.env.SERVER_URL,
                        landPhotograph: FileStorage.getUrl(land.photograph),
                      },
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
