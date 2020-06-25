'use strict';

const jwt = require('jsonwebtoken');

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
        req.user = {
          id: decrypt.id,
          first_name: decrypt.first_name,
          last_name: decrypt.last_name,
          email: decrypt.email,
        };
        return next();
      } catch (err) {
        res.status(401).send();
      }
    }
    res.status(401).send();
  },
};
