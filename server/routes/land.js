'use strict';

const express = require('express');
const router = express.Router();

const LandController = require('../controllers/land');
const MemoryController = require('../controllers/memory');
const JWTMiddleware = require('../middlewares/jwt');

router.get('/', LandController.findAll);
router.post(
  '/',
  JWTMiddleware.requireJWT,
  LandController.validateStoreRequest,
  LandController.storePhotograph,
  LandController.store
);
router.get('/geojson', LandController.findGeoJson);
router.post('/intersect', LandController.intersect);
router.post('/select', LandController.select);
router.get('/:id', LandController.lookup, LandController.get);
router.put('/:id', LandController.lookup, LandController.update);
router.delete('/:id', LandController.lookup, LandController.remove);
router.post('/:id/like', JWTMiddleware.requireJWT, LandController.like);
router.get('/:id/like', JWTMiddleware.verifyJWT, LandController.checkUserLike);

router.get('/:landId/memory', MemoryController.findByLand);
router.post('/:landId/memory', JWTMiddleware.requireJWT, MemoryController.store)

module.exports = router;
