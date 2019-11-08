'use strict';

const Models        = require('../../db/models');
const User          = Models.ResetPassword;

module.exports = {
  lookup: function (req, res, next) {
    if (req.params.id == '-1') {
      req.resetPassword = User.build({});
      return next();
    }

    User
      .findOne({ where: { id: req.params.id } })
      .then(function (resetPassword) {
        if (!resetPassword) { return res.status(404).send(''); }

        req.resetPassword = resetPassword;
        next();
        return resetPassword;
      })
      .catch(function (err) {
        res.status(400).send(err);
      });
  }
};
