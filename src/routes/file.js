'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');

const FileController = require('../controllers/file');
const FileUploader = multer();

router.post('/', FileUploader.single('file'), FileController.put);

module.exports = router;
