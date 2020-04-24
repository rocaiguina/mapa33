'use strict';

module.exports = {
  img: function (data) {
    var reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
    var match = data.match(reg);
    var baseType = {
      jpeg: 'jpg'
    };

    baseType['svg+xml'] = 'svg'

    if (!match) {
      throw new Error('image base64 data error');
    }

    var extname = baseType[match[1]] ? baseType[match[1]] : match[1];

    return {
      extname: '.' + extname,
      base64: match[2]
    };
  }
}
