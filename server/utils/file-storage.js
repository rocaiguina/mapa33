'use strict';
const path = require('path');
const StorageManager = require('@slynova/flydrive');
const config = {
  default: 'local',
  disks: {
    local: {
      driver: 'local',
      root: path.dirname(path.dirname(__dirname)),
    },
    s3: {
      driver: 's3',
      key: process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
      secret: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY,
      region: process.env.BUCKETEER_AWS_REGION,
      bucket: process.env.BUCKETEER_BUCKET_NAME,
    },
  },
};

// Bucketeer: All files prefixed with 'public/', will be available on the
// public internet.
const PREFIX = 'public';
const driver = process.env.NODE_ENV == 'production' ? 's3' : 'local';
const storage = new StorageManager(config).disk(driver);

module.exports.getUrl = function(location) {
  if (driver == 'local') {
    return `${process.env.SERVER_URL}/${location}`;
  }
  return storage.getUrl(location);
};

module.exports.put = function(location, content, options) {
  return new Promise(function(resolve, reject) {
    storage
      .put(path.join(PREFIX, location), content, options)
      .then(function() {
        resolve(path.join(PREFIX, location));
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

module.exports.delete = function(location) {
  return storage.delete(path.join(PREFIX, location));
};
