'use strict';

const jwt = require('jsonwebtoken');
const express = require('express');
var db = require('../../db/models');
const User = db.User;
const router = express.Router();

router.post('/', function(req, res) {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  })
    .then(function(user) {
      if (user != null) {
        const user = {
          email: req.body.email,
          password: req.body.password,
        };
        jwt.sign({ user: user }, 'llave', function(err, token) {
          res.json({ token });
        });
      } else {
        res.json('NO VÁLIDO');
      }
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
