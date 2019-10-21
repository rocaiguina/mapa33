const express = require('express');
const router = express.Router();

const Models = require('../../db/models');
const User = Models.User;

router.get('/all', function(req, res, next) {
  User.findAll()
  .then(all => {
    console.log(all)
    res.send(all);
  })
});

module.exports = router;
