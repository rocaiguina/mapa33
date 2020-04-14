'use strict';

const Models = require('../../db/models');
const Land = Models.Land;
const User = Models.User;

module.exports = {
  lookup: function(req, res, next) {
    if (req.params.id == '-1') {
      req.land = Land.build({});
      return next();
    }

    Land.findOne({
      where: { id: req.params.id },
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
        return land;
      })
      .catch(function(err) {
        res.status(400).send(err);
      });
  },
};
