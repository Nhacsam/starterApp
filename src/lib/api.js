// @flow weak
const apiUrl = 'http://0.0.0.0:3000/api';

if (__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest
    ? global.originalXMLHttpRequest
    : global.XMLHttpRequest;
  global.FormData = global.originalFormData ? global.originalFormData : global.FormData;
}

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    if (response.status !== 204) return response.json();
    return response;
  }
  return response.json().then(data => {
    return Promise.reject({
      ...response,
      data,
    });
  });
};

export const request = (route, method = 'GET', payload = null, additionalHeaders = {}) => {
  if (!route) return;
  const url = `${apiUrl}${route}`;

  const headers = {
    'Content-Type': 'application/json',
    ...additionalHeaders,
  };

  return fetch(url, {
    method,
    headers,
    body: payload ? JSON.stringify(payload) : null,
  }).then(checkStatus);
};

export const signup = user => request('/Users', 'POST', user);
export const login = (email: string, password: string) =>
  request('/Users/login', 'POST', { email, password });
