import 'es6-promise';
import fetch from 'isomorphic-fetch';

const canUseDOM = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

export const INIT_DID_MOUNT = 'INIT_DID_MOUNT';
export const LOADED_ME = 'LOADED_ME';
export const LOADED_ITEMS = 'LOADED_ITEMS';
export const LOADED_USERS = 'LOADED_USERS';

function fetchData(api) {
  api = canUseDOM ? api : `http://localhost:3000${api}`;
  return fetch(api);
}

export function didMount() {
  return dispatch => {
    return dispatch({
      type: INIT_DID_MOUNT
    });
  };
}

export function loadMe() {
  return dispatch => {
    return fetchData('/api/me')
      .then(res => {
        if (res.status >= 400) {
            throw new Error('Bad response from server');
        }
        return res.json();
      }).then(data => {
        return dispatch({
          type: LOADED_ME,
          me: data
        });
      }).catch(error => {
        console.log(error);
        throw error;
      });
  };
}

export function loadItems() {
  return dispatch => {
    return fetchData('/api/items')
      .then(res => {
        if (res.status >= 400) {
            throw new Error('Bad response from server');
        }
        return res.json();
      }).then(data => {
        return dispatch({
          type: LOADED_ITEMS,
          items: data
        });
      }).catch(error => {
        console.log(error);
        throw error;
      });
  };
}

export function loadUsers() {
  return dispatch => {
    return fetchData('/api/users')
      .then(res => {
        if (res.status >= 400) {
            throw new Error('Bad response from server');
        }
        return res.json();
      }).then(data => {
        return dispatch({
          type: LOADED_USERS,
          users: data
        });
      }).catch(error => {
        console.log(error);
        throw error;
      });
  };
}
