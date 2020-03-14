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
        reject(err);
      });
  });
};

export default {
  register,
};
