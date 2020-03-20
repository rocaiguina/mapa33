import Axios from 'axios';

export const register = function(data) {
  return new Promise((resolve, reject) => {
    Axios.post('/api/user', data)
      .then(response => {
        if (response.status == 200) {
          return resolve(response.data);
        }
        reject(response.data);
      })
      .catch(err => {
        reject(err.response);
      });
  });
};

export const getProfile = function() {
  return new Promise((resolve, reject) => {
    Axios.get('/api/user/me')
      .then(response => {
        if (response.status == 200) {
          return resolve(response.data);
        }
        reject(response.data);
      })
      .catch(err => {
        reject(err.response);
      });
  });
};

export const updateProfile = function(data) {
  return new Promise((resolve, reject) => {
    Axios.put('/api/user/me', data)
      .then(response => {
        if (response.status == 200) {
          return resolve(response.data);
        }
        reject(response.data);
      })
      .catch(err => {
        reject(err.response);
      });
  });
};

export default {
  register,
  getProfile,
  updateProfile,
};
