'use strict';

const FileStorage = require('../utils/file-storage');

const put = (req, res) => {
  if (req.file) {
    //console.log(req.files);
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
    console.log(req.file);
    res.send({
      fieldname: 'file',
      originalname: 'cuadrado.png',
      mimetype: 'image/png',
      url: 'https://dummyimage.com/600x400/000/fff',
    });
  } else {
    res.send('');
  }
};

module.exports = {
  put,
};
