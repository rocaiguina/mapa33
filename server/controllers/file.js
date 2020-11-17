'use strict';

const Path = require('path');
const RandomToken = require('random-token');
const FileStorage = require('../utils/file-storage');

const put = (req, res) => {
  if (req.file) {
    /*
    File {
      "fieldname": "files",
      "originalname": "cuadrado.png"
      "encoding": "7-bit",
      "mimetype": "image/png",
      "buffer": {
        "type": "Buffer",
        "data": [...]
      },
      "size": 999
    }
    */
    const fileExtension = Path.extname(req.file.originalname);
    const fileName = RandomToken(10) + fileExtension;
    const filePath = Path.join('multimedia', fileName);
    const fileContent = req.file.buffer;

    FileStorage.put(filePath, fileContent)
      .then(function() {
        res.send({
          fieldname: req.file.fieldname,
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          url: FileStorage.getUrl(filePath),
        });
      })
      .catch(function(err) {
        res.status(400).send(err);
      });
  } else {
    res.status(400).send();
  }
};

module.exports = {
  put,
};
