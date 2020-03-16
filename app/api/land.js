import Axios from 'axios';

export const get = function(id) {
  return new Promise((resolve, reject) => {
    Axios.get(`/api/land/${id}`)
      .then(response => {
        if (response.status == 200) {
          return resolve(response.data);
        }
        reject(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const find = function(filters) {
  return new Promise((resolve, reject) => {
    Axios.get('/api/land', { params: filters })
      .then(response => {
        if (response.status == 200) {
          return resolve(response.data);
        }
        reject(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const isLikedByUser = function(landId, userId) {
  return new Promise((resolve, reject) => {
    Axios.get(`/api/land/${landId}/like/${userId}`)
      .then(response => {
        if (response.status == 200) {
          return resolve(response.data != null);
        }
        reject(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const like = function(landId, userId) {
  return new Promise((resolve, reject) => {
    Axios.post(`/api/land/${landId}/like`, { user_id: userId })
      .then(response => {
        if (response.status == 200) {
          return resolve(response.data);
        }
        reject(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {
  get,
  find,
  isLikedByUser,
  like,
};
