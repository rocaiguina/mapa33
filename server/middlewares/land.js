'use strict';

const Models        = require('../../db/models');
const Land          = Models.Land;

module.exports = {
  lookup: function (req, res, next) {
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
};
