import Moment from 'moment';
import AuthApi from '../api/auth';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const USER_SESSION_TIME = 3540; // (in seconds) 3540 = 59 minutes
const USER_KEY = 'user';
const USER_SESSION_EXPIRES_AT = 'user_session_expires_at';

export const hasSessionExpired = function() {
  let expired = true;
  const expiresAt = localStorage.getItem(USER_SESSION_EXPIRES_AT);
  if (expiresAt) {
    return Moment(expiresAt, DATE_TIME_FORMAT).isBefore(Moment());
  }
  return expired;
};

export const isUserLogged = function() {
  if (hasSessionExpired()) {
    return false;
  }

  let user = localStorage.getItem(USER_KEY);
  return user !== null;
};

export const getLoggedUser = function() {
  let user = false;
  if (!hasSessionExpired()) {
    try {
      user = JSON.parse(localStorage.getItem(USER_KEY));
    } catch (err) {
      console.log(err);
    }
  }
  return user;
};

export const logout = function() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(USER_SESSION_EXPIRES_AT);
};

export const authenticate = function(user) {
  const sessionExpiresAt = Moment()
    .add(USER_SESSION_TIME, 'seconds')
    .format(DATE_TIME_FORMAT);
  localStorage.setItem(USER_SESSION_EXPIRES_AT, sessionExpiresAt);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const login = function(credentials) {
  return new Promise((resolve, reject) => {
    AuthApi.login(credentials)
      .then(user => {
        resolve(user);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        const sessionExpiresAt = Moment()
          .add(USER_SESSION_TIME, 'seconds')
          .format(DATE_TIME_FORMAT);
        localStorage.setItem(USER_SESSION_EXPIRES_AT, sessionExpiresAt);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {
  hasSessionExpired,
  authenticate,
  getLoggedUser,
  login,
  logout,
  isUserLogged,
};
