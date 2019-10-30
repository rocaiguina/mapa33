const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.get('/',UserController.findAll);
router.get('/:id', UserController.lookup,UserController.get);
router.post('/', UserController.store);
router.put('/:id',UserController.lookup,UserController.update);
router.delete('/:id',UserController.lookup,UserController.remove);

module.exports = router;