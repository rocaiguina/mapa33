'use strict';

const Models = require('../../db/models');
const Memory = Models.Memory;
const Land = Models.Land;
const Multimedia = Models.Multimedia;
const User = Models.User;

module.exports = {
  lookup: function(req, res, next) {
    if (req.params.id == '-1') {
      req.memory = Memory.build({});
      return next();
    }

    Memory.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Land,
          as: 'land',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name', 'email'],
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
    })
      .then(function(memory) {
        if (!memory) {
          return res.status(404).send('');
        }
        req.memory = memory;
        next();
        return memory;
      })
      .catch(function(err) {
        res.status(400).send(err);
      });
  },
};
