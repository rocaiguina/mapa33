'use strict';

const axios = require('axios');
const Mime = require('mime-types');
const RandomToken = require('random-token');

const FileStorage = require('./file-storage');
const { getSocialImageHtml } = require('./getSocialImageHtml');

module.exports.createPhotograp = function(land) {
  return new Promise(function(resolve, reject) {
    if (!land.social_photograph) {
      const photographURL = land.photographURL;
      const name = land.name;
      const location = land.location;
      const coordinates = land.humanCoordinates;

      const payload = {
        html: getSocialImageHtml(
          photographURL,
          name,
          location,
          coordinates
        ),
        viewport_width: 760,
        viewport_height: 376,
      };
      const headers = {
        auth: {
          username: '0c55bca0-4073-4054-a288-0bc5c72e9cad',
          password: 'a1774ae8-7c16-4846-bc2e-91c3ad2f4ce0',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const filename = RandomToken(10) + '.jpg';
      const filepath = `lands/social/${filename}`;
      const fileOpts = {
        ContentType: Mime.lookup(filename),
      };

      axios
        .post('https://hcti.io/v1/image', JSON.stringify(payload), headers)
        .then(function(imageUrl) {
          // TODO: axios.delete(imageUrl); // Should we delete the image from hcti?
          return axios.get(imageUrl.data.url, {
            responseType: 'arraybuffer',
          });
        })
        .then(function(bufferData) {
          return FileStorage.put(
            filepath,
            Buffer.from(bufferData.data),
            fileOpts
          );
        })
        .then(function(response) {
          resolve(response);
        })
        .catch(function(err) {
          reject(err);
        });
    } else {
      return resolve(null);
    }
  });
};
