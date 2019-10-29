'use strict';

const Models        = require('../../db/models');
const User          = Models.User;

module.exports = {
  lookup: function (req, res, next) {
    if (req.params.id == '-1') {
      req.user = User.build({});
      return next();
    }

    User
      .findOne({ where: { id: req.params.id } })
      .then(function (user) {
        if (!user) { return res.status(404).send(''); }

        req.user = user;
        next();
        return user;
      })
      .catch(function (err) {
        res.status(400).send(err);
      });
  }
};
