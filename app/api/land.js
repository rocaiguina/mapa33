import Axios from 'axios';

export const register = function(data) {
  return new Promise((resolve, reject) => {
    Axios.post('/api/land', data)
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

export const findAutoComplete = function(q) {
  return new Promise((resolve, reject) => {
    Axios.get('/api/land/autocomplete', { params: { q } })
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

export const isLikedByUser = function(landId) {
  return new Promise((resolve, reject) => {
    Axios.get(`/api/land/${landId}/like`)
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

export const like = function(landId) {
  return new Promise((resolve, reject) => {
    Axios.post(`/api/land/${landId}/like`)
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

export const registerMemory = function(landId, data) {
  return new Promise((resolve, reject) => {
    Axios.post(`/api/land/${landId}/memory`, data)
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

export const getMemories = function(landId, page) {
  return new Promise((resolve, reject) => {
    Axios.get(`/api/land/${landId}/memory?page=${page || 1}`)
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
  get,
  find,
  findAutoComplete,
  isLikedByUser,
  like,
  registerMemory,
  getMemories,
};
