const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.get('/',UserController.getUsuarios);
router.get('/:id', UserController.getUsuarioById);
router.post('/', UserController.postInsertUsuario);
router.put('/:id',UserController.putUpdateUsuario);
router.delete('/:id',UserController.deleteDeleteUsuario);

module.exports = router;