import Axios from 'axios';

export const activities = function() {
  return new Promise((resolve, reject) => {
    Axios.get('/api/profile/activities')
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

export const deleteProposedLand = function(landId) {
  return new Promise((resolve, reject) => {
    Axios.delete(`/api/profile/activity/land/${landId}`)
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

export const deleteMemory = function(memoryId) {
  return new Promise((resolve, reject) => {
    Axios.delete(`/api/profile/activity/memory/${memoryId}`)
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

export const unLikeLand = function(likeId) {
  return new Promise((resolve, reject) => {
    Axios.delete(`/api/profile/activity/unlike/${likeId}`)
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
  activities,
  deleteProposedLand,
  deleteMemory,
  unLikeLand,
};
