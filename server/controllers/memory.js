'use strict';

const Joi = require('joi');
const Paginator = require('paginator');
const sgMail = require('@sendgrid/mail');

const Models = require('../../db/models');
const Memory = Models.Memory;
const Multimedia = Models.Multimedia;
const User = Models.User;

const { MEMORY_STATUS, MULTIMEDIABLES } = require('../../config/constants');

const findByLand = (req, res) => {
  let options = {
    page: req.query.page || 1,
    paginate: req.query.limit || 10,
    where: {
      land_id: req.params.landId,
      status: MEMORY_STATUS.APPROVED,
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['first_name', 'last_name'],
      },
      {
        model: Multimedia,
        as: 'multimedias',
        constraints: false,
        scope: {
          multimediable: 'MEMORY',
        },
      },
    ],
  };

  Memory.paginate(options)
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
};

const store = (req, res) => {
  const validationSchema = {
    title: Joi.string(),
    description: Joi.string().allow(null, ''),
    media_type: Joi.string().allow(null, ''),
    multimedias: Joi.array().items(
      Joi.object({
        name: Joi.string()
          .allow(null, '')
          .optional(),
        type: Joi.string(),
        url: Joi.string(),
      })
    ),
  };

  const { body } = req;
  // Validata data.
  const { error, value } = Joi.validate(body, validationSchema, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    return res.status(400).send(error);
  }

  const { title, description, media_type, multimedias } = value;
  let createdMemory = undefined;

  Memory.create({
    title,
    description,
    media_type,
    status: MEMORY_STATUS.APPROVED,
    user_id: req && req.user && req.user.id,
    land_id: req.params.landId,
  })
    .then(memory => {
      createdMemory = memory;
      const multimediaData = multimedias.map(item => {
        const single = item;
        single.multimediable = MULTIMEDIABLES.MEMORY;
        single.multimediable_id = memory.id;
        return single;
      });
      return Multimedia.bulkCreate(multimediaData);
    })
    .then(() => {
      // variables para email
      const createMemoryTemplateId = 'd-dcc09eed78384160b97928400c5fcc33';
      const contacto = process.env.SERVER_URL + '/contact-us';
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: req.user.email,
        from: process.env.DEFAULT_EMAIL_FROM,
        templateId: createMemoryTemplateId,
        dynamic_template_data: {
          contact: contacto,
        },
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

      res.send(createdMemory.get({ plain: true }));
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
};

module.exports = {
  store,
  findByLand,
};
