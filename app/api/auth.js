import Axios from 'axios';

export const login = function(data) {
  return new Promise((resolve, reject) => {
    Axios.post('/api/auth', data)
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
  login,
};
