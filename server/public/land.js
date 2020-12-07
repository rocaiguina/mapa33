'use strict';

const { LAND_PROTECTION_REASONS } = require('../../config/constants');
const Models = require('../../db/models');
const Land = Models.Land;

function get(req, res) {
  Land.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ['geom'] },
  })
    .then(function(land) {
      if (!land) {
        return res.status(404).send('');
      }
      const description = land.reason_conservation ? LAND_PROTECTION_REASONS.filter(
        reason => reason.value === land.reason_conservation
        )[0].label : "";
      const metatags = {
        og_title: land.name,
        og_description: description,
        og_image: land.socialPhotographURL,
      };
      res.render('public/index', metatags);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

module.exports = {
  get,
};
