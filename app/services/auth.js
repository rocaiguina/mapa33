import AuthApi from '../api/auth';

export const getLoggedUser = function() {
  let user = false;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (err) {
    console.log(err);
  }
  return user;
};

export const logout = function() {
  localStorage.removeItem('user');
};

export const login = function(credentials) {
  return new Promise((resolve, reject) => {
    AuthApi.login(credentials)
      .then(user => {
        resolve(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {
  getLoggedUser,
  login,
  logout,
};