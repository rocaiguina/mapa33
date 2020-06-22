import Axios from 'axios';

export const login = function(data) {
  return new Promise((resolve, reject) => {
    Axios.post('/api/auth/login', data)
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

export const logout = function() {
  return new Promise((resolve, reject) => {
    Axios.get('/api/auth/logout')
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

export const forgotPassword = function(data) {
  return new Promise((resolve, reject) => {
    Axios.post('/api/auth/forgot-password', data)
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

export const resetPassword = function(token, data) {
  return new Promise((resolve, reject) => {
    Axios.post('/api/auth/reset-password/' + token, data)
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
  login,
  logout,
  forgotPassword,
  resetPassword,
};
