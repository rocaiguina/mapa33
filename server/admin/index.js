'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('dashboard/index');
});

router.get('/land', function (req, res, next) {
  res.render('land/index');
});

router.get('/land/create', function (req, res, next) {
  res.render('land/form');
});

router.get('/land/:id', function (req, res, next) {
  res.render('land/form');
});

module.exports = router;
