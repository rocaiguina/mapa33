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
          const credentials = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          };
          const token = jwt.sign({ user: credentials }, 'private key here');
          return res.json({ token });
        }
      }
      res.status(400).send('Authentication failed.');
    })
    .catch(err => {
      return res.status(400).send(err);
    });
});

module.exports = router;
