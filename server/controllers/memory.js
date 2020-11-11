'use strict';

const Joi = require('joi');

const Models = require('../../db/models');
const Memory = Models.Memory;
const Multimedia = Models.Multimedia;

const { MEMORY_STATUS, MULTIMEDIABLES } = require('../constants');

const store = (req, res) => {
  const validationSchema = {
    title: Joi.string(),
    description: Joi.string().allow(null, ''),
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

  const { title, description, multimedias } = value;
  let createdMemory = undefined;

  Memory.create({
    title,
    description,
    status: MEMORY_STATUS.NEW,
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
      res.send(createdMemory.get({ plain: true }));
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
};

module.exports = {
  store,
};
