'use strict';

const Joi = require('joi');
const sharp = require('sharp');
const Paginator = require('paginator');
const RandomToken = require('random-token');
const Sequelize = require('sequelize');
const Models = require('../../db/models');
const Land = Models.Land;
const Op = Sequelize.Op;
const Validator = require('../utils/validator');
const axios = require('axios');
const { getSocialImageHtml } = require('../utils/getSocialImageHtml');
const { geojsonToSvg } = require('../utils/geojsonToSvg');

const sgMail = require('@sendgrid/mail');
const FileStorage = require('../utils/file-storage');
const Constants = require('../../config/constants');

function uploadPhotograph(req) {
  return new Promise(function(resolve, reject) {
    if (req.file) {
      const filename = RandomToken(10) + '.jpg';
      const filepath = `lands/${filename}`;
      return FileStorage.put(filepath, req.file.buffer)
        .then(function(response) {
          resolve(response);
        })
        .catch(function(err) {
          reject(err);
        });
    }
    return resolve(null);
  });
}

function uploadLandShape(req) {
  return new Promise(function(resolve, reject) {
    if (!req.land.land_shape && req.body.status === 'approved') {
      const svg = geojsonToSvg(req.land.dataValues.geom.coordinates[0], 500);
      const filename = RandomToken(10) + '.png';
      const filepath = `lands/polygon/${filename}`;
      const image = Buffer.from(svg);
      sharp(image)
        .toFormat('png')
        .toBuffer()
        .then(newImage => {
          return FileStorage.put(filepath, newImage);
        })
        .then(function(response) {
          resolve(response);
        })
        .catch(function(err) {
          reject(err);
        });
    } else {
      return resolve(null);
    }
  });
}

function uploadSocialPhotograph(req) {
  return new Promise(function(resolve, reject) {
    if (!req.land.social_photograph && req.body.status === 'approved') {
      const photograph = req.land.dataValues.photograph;
      const name = req.land.dataValues.name;
      const ownerName = req.land.dataValues.metadata.owner_name;
      const location = req.land.dataValues.location;
      const areaSize = req.land.dataValues.area_size;

      const payload = {
        html: getSocialImageHtml(
          photograph,
          name,
          ownerName,
          location,
          areaSize
        ),
        viewport_width: 760,
        viewport_height: 376,
      };
      const headers = {
        auth: {
          username: '0c55bca0-4073-4054-a288-0bc5c72e9cad',
          password: 'a1774ae8-7c16-4846-bc2e-91c3ad2f4ce0',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const filename = RandomToken(10) + '.jpg';
      const filepath = `lands/social/${filename}`;

      axios
        .post('https://hcti.io/v1/image', JSON.stringify(payload), headers)
        .then(function(imageUrl) {
          // TODO: axios.delete(imageUrl); // Should we delete the image from hcti?
          return axios.get(imageUrl.data.url, {
            responseType: 'arraybuffer',
          });
        })
        .then(function(bufferData) {
          return FileStorage.put(filepath, Buffer.from(bufferData.data));
        })
        .then(function(response) {
          resolve(response);
        })
        .catch(function(err) {
          reject(err);
        });
    } else {
      return resolve(null);
    }
  });
}

class LandAdminController {
  findAll(req, res, next) {
    let options = {
      page: req.query.page || 1,
      paginate: req.query.limit || 10,
      where: {},
      order: [['name', 'ASC']],
    };
    let filters = {};

    if (req.query.status) {
      options.where.status = req.query.status;
      filters.status = req.query.status;
    }

    if (req.query.level) {
      options.where.level = req.query.level;
      filters.status = req.query.level;
    }

    if (req.query.q) {
      options.where.name = {
        [Op.iLike]: '%' + req.query.q + '%',
      };
      filters.q = req.query.q;
    }

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
        res.render('land/index', { paginator: data, filters });
      })
      .catch(function(err) {
        next(err);
      });
  }

  save(req, res) {
    var land = req.land;
    var data = req.body;

    const validationSchema = {
      name: Joi.string(),
      level: Joi.string().allow(null, ''),
      plots_count: Joi.number()
        .integer()
        .empty('')
        .default(null),
      area_size: Joi.number()
        .empty('')
        .default(null),
      area_type: Joi.string().allow(null, ''),
      location: Joi.string().allow(null, ''),
      entity: Joi.string().allow(null, ''),
      acquisition_type: Joi.string().allow(null, ''),
      year_acquisition: Joi.number()
        .integer()
        .empty('')
        .default(null),
      year_estab: Joi.number()
        .integer()
        .empty('')
        .default(null),
      ownership: Joi.string().allow(null, ''),
      status: Joi.string().allow(null, ''),
      reason_conservation: Joi.string().allow(null, ''),
      notes: Joi.string().allow(null, ''),
      know_owner: Joi.boolean(),
      are_u_owner: Joi.boolean(),
      catastro_numbers: Joi.string()
        .allow(null, '')
        .empty('')
        .default(''),
      owner_name: Joi.string().allow(null, ''),
      owner_email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .allow(null, ''),
      owner_phone: Joi.string().allow(null, ''),
      inheritance_land: Joi.boolean(),
      inheritance_agree: Joi.boolean(),
      lands_problem: Joi.array()
        .empty('')
        .default([])
        .single(),
      lands_other_problem: Joi.string().allow(null, ''),
      has_mortgage: Joi.boolean(),
      has_surveying: Joi.boolean(),
      main_uses: Joi.array()
        .empty('')
        .default([])
        .single(),
      other_main_uses: Joi.string().allow(null, ''),
      lands_structures: Joi.array()
        .empty('')
        .default([])
        .single(),
      lands_other_structures: Joi.string().allow(null, ''),
      main_attributes: Joi.array()
        .empty('')
        .default([])
        .single(),
      other_main_attributes: Joi.string().allow(null, ''),
      has_contamination: Joi.string().allow(null, ''),
      proposed_uses: Joi.array()
        .empty('')
        .default([])
        .single(),
    };

    // Validata data.
    const result = Joi.validate(data, validationSchema, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (result.error) {
      // Add error flash messages.
      req.flash('error', 'Datos inválidos. Por favor verifica los datos.');
      req.flash('field_errors', Validator.getErrors(result.error.details));
      return res.redirect('/admin/land/' + (land.isNewRecord ? '-1' : land.id));
    }

    Promise.all([
      uploadLandShape(req),
      uploadSocialPhotograph(req),
      uploadPhotograph(req),
    ])
      .then(function(photos) {
        let [landShapeUrl, socialPhotograhUrl, fileUrl] = photos;

        const cleaned_data = result.value;
        const notifyStatusChanged = cleaned_data.status != land.status;

        land.name = cleaned_data.name;
        land.level = cleaned_data.level;
        land.location = cleaned_data.location;
        land.main_attributes = cleaned_data.main_attributes;
        land.other_main_attributes = cleaned_data.other_main_attributes;
        land.main_uses = cleaned_data.main_uses;
        land.other_main_uses = cleaned_data.other_main_uses;
        land.proposed_uses = cleaned_data.proposed_uses;

        land.plots_count = cleaned_data.plots_count;
        land.area_size = cleaned_data.area_size;
        land.area_type = cleaned_data.area_type;
        land.entity = cleaned_data.entity;
        land.use_type = cleaned_data.use_type;
        land.acquisition_type = cleaned_data.acquisition_type;
        land.year_estab = cleaned_data.year_estab;
        land.year_acquisition = cleaned_data.year_acquisition;
        land.reason_conservation = cleaned_data.reason_conservation;
        land.ownership = cleaned_data.ownership;
        land.notes = cleaned_data.notes;
        land.status = cleaned_data.status;
        land.metadata = {
          are_u_owner: cleaned_data.are_u_owner,
          catastro_numbers: cleaned_data.catastro_numbers.trim().split('\n'),
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
        };

        if (fileUrl) {
          land.photograph = fileUrl;
        }

        if (landShapeUrl) {
          land.land_shape = landShapeUrl;
        }

        if (socialPhotograhUrl) {
          land.social_photograph = socialPhotograhUrl;
        }

        land
          .save()
          .then(function() {
            if (req.land.id && notifyStatusChanged) {
              if (cleaned_data.status == 'approved') {
                // variables para email
                const sitio = process.env.SERVER_URL + '/land/' + land.id;
                const contacto = process.env.SERVER_URL + '/contact-us';
                const terrainName = land.name;
                const landApprovedTemplateId =
                  'd-864a041ce69345a28d3a5c1dd530700a';

                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const mailOptions = {
                  to: land.user.email,
                  from: process.env.DEFAULT_EMAIL_FROM, // list of receivers
                  templateId: landApprovedTemplateId,
                  dynamic_template_data: {
                    terrain_name: terrainName,
                    site: sitio,
                    contact: contacto,
                  },
                };
                sgMail.send(mailOptions).then(
                  () => {},
                  error => {
                    console.error(error);
                  }
                );
              } else if (cleaned_data.status == 'denied') {
                const contacto = process.env.SERVER_URL + '/contact-us';
                const notes = req.land.notes;
                const landDeniedTemplateId =
                  'd-3ff254035db74cec8eb0ce4e24d993d1';

                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const mailOptions = {
                  to: land.user.email,
                  from: process.env.DEFAULT_EMAIL_FROM,
                  templateId: landDeniedTemplateId,
                  dynamic_template_data: {
                    notes: notes,
                    contact: contacto,
                  },
                };
                sgMail.send(mailOptions).then(
                  () => {},
                  error => {
                    console.error(error);
                  }
                );
              }
            }
            req.flash('success', 'Your data has been saved.');
          })
          .catch(function(err) {
            console.error(err);
            req.flash('error', err.message);
          })
          .finally(function() {
            res.redirect('/admin/land/' + land.id);
          });
      })
      .catch(function(err) {
        console.error(err);
        req.flash('error', err.message);
        res.redirect('/admin/land/' + land.id);
      });
  }

  get(req, res) {
    let land = req.land.get({ plain: true });
    const levels = Constants.LAND_LEVELS;
    const types = Constants.LAND_TYPES;
    const status = Constants.LAND_STATUS;
    const issues = Constants.LAND_ISSUES;
    const main_uses = Constants.LAND_MAIN_USES;
    const structures = Constants.LAND_STRUCTURES;
    const attributes = Constants.LAND_ATTRIBUTES;
    const proposed_uses = Constants.LAND_PROPOSED_USES;
    const protection_reasons = Constants.LAND_PROTECTION_REASONS;
    res.render('land/form', {
      object: land,
      levels,
      types,
      status,
      issues,
      main_uses,
      structures,
      attributes,
      proposed_uses,
      protection_reasons,
    });
  }

  remove(req, res, next) {
    var land = req.land;

    land
      .destroy()
      .then(function() {
        res.redirect('/admin/land');
      })
      .catch(function(err) {
        next(err);
      });
  }
}

module.exports = new LandAdminController();
