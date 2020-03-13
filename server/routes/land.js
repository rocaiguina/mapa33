'use strict';

const express = require('express');
const router = express.Router();

const LandController = require('../controllers/land');

router.get('/', LandController.findAll);
router.post('/', LandController.storePhotograph, LandController.store);
router.get('/geojson', LandController.findGeoJson);
router.post('/intersect', LandController.intersect);
router.post('/select', LandController.select);
router.get('/:id', LandController.lookup, LandController.get);
router.put('/:id', LandController.lookup, LandController.update);
router.delete('/:id', LandController.lookup, LandController.remove);
router.post('/:id/like', LandController.like);
router.get('/:id/like/:user_id', LandController.checkUserLike);

module.exports = router;
