'use strict';

const jwt = require('jsonwebtoken');
const express = require('express');
const encryptor = require('../utils/encryptor');
var db = require('../../db/models');

const router = express.Router();
const User = db.User;

router.post('/', function(req, res) {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(function(user) {
      if (user != null) {
        const matchCredentials = encryptor.compare(
          req.body.password,
          user.password
        );
        if (matchCredentials) {
          const payload = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET);
          res.cookie('access_token', token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
            secure: false, // set to true if your using https
          });
          res.send(payload);
        }
      }
      res.status(400).send('Authentication failed.');
    })
    .catch(err => {
      return res.status(400).send(err);
    });
});

module.exports = router;
