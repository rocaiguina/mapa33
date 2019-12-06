const express = require('express');
const router = express.Router();

const LandController = require('../controllers/land');

router.get('/', LandController.findAll);
router.post('/', LandController.store);
router.get('/intersect', LandController.intersect);
router.get('/select', LandController.select);
router.get('/:id', LandController.lookup, LandController.get);
router.put('/:id', LandController.lookup, LandController.update);
router.delete('/:id', LandController.lookup, LandController.remove);

module.exports = router;
