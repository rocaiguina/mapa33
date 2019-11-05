const express   = require('express');
const router    = express.Router();

const UserController        = require('../controllers/user');
const UserSurveyController  = require('../controllers/user-survey');
const SurveyMiddleware      = require('../middlewares/survey');

router.get('/',UserController.findAll);
router.get('/:id', UserController.lookup,UserController.get);
router.post('/', UserController.store);
router.put('/:id',UserController.lookup,UserController.update);
router.delete('/:id',UserController.lookup,UserController.remove);

// User's surveys
router.post('/:userId/survey', UserSurveyController.store);
router.get('/:userId/survey', SurveyMiddleware.lookup, UserSurveyController.get);
router.put('/:userId/survey', UserSurveyController.store);
router.delete('/:userId/survey', SurveyMiddleware.lookup, UserSurveyController.remove);

module.exports = router;