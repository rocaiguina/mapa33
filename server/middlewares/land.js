'use strict';

const Models = require('../../db/models');
const Land = Models.Land;

module.exports = {
  lookup: function(req, res, next) {
    if (req.params.id == '-1') {
      req.land = Land.build({});
      return next();
    }

    Land.findOne({ where: { id: req.params.id } })
      .then(function(land) {
        if (!land) {
          return res.status(404).send('');
        }
        
        req.land = land;
        console.log("ESto es land:" + land.use_type );
        next();
        return land;
      })
      .catch(function(err) {
        res.status(400).send(err);
      });
  },
};
