'use strict';

const Mime = require('mime-types');
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
    const filePath = `multimedia/${fileName}`;
    const fileContent = req.file.buffer;
    const fileOpts = {
      ContentType: Mime.lookup(fileName),
    };

    FileStorage.put(filePath, fileContent, fileOpts)
      .then(function(response) {
        res.send({
          fieldname: req.file.fieldname,
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          url: FileStorage.getUrl(response),
        });
      })
      .catch(function(err) {
        res.status(400).send(err);
      });
  } else {
    res.status(400).send();
  }
  // setTimeout(function() {
  //   res.send({
  //     fieldname: 'cuadrado.png',
  //     originalname: 'cuadrado.png',
  //     mimetype: 'image',
  //     url: 'https://dummyimage.com/600x400/000/fff',
  //   });
  // }, 2000);
};

module.exports = {
  put,
};
