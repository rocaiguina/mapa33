'use strict';

const jwt = require('jsonwebtoken');
const Models = require('../../db/models');
const User = Models.User;

module.exports = {
  verifyJWT: function(req, res, next) {
    const accessToken = req.cookies.access_token;
    if (accessToken) {
      try {
        const decrypt = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = {
          id: decrypt.id,
          first_name: decrypt.first_name,
          last_name: decrypt.last_name,
          email: decrypt.email,
        };
      } catch (err) {
        return next();
      }
    }
    next();
  },
  requireJWT: function(req, res, next) {
    const accessToken = req.cookies.access_token;

    if (accessToken) {
      try {
        const decrypt = jwt.verify(accessToken, process.env.JWT_SECRET);
        User.findOne({
          where: { id: decrypt.id },
        })
          .then(function(user) {
            if (!user) {
              return res.status(401).send();
            }
            req.user = user.get({ plain: true });
            next();
          })
          .catch(function(err) {
            res.status(401).send(err);
          });
      } catch (err) {
        res.status(401).send();
      }
    } else {
      res.status(401).send();
    }
  },
};
