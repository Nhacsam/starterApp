// @flow
import { accessTokenSelector } from 'starterApp/src/modules/Model/Auth';
import type { UserType, AuthType } from 'modelDefinition';
import type { Store } from 'redux';

const apiUrl = 'http://0.0.0.0:3000/api';

let store: ?Store;
const getAccessToken = (): ?string => {
  if (!store) {
    return null;
  }
  return accessTokenSelector(store.getState());
};

if (__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest
    ? global.originalXMLHttpRequest
    : global.XMLHttpRequest;
  global.FormData = global.originalFormData ? global.originalFormData : global.FormData;
}

const checkStatus = (response: Response): Promise<Object> => {
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

export const request = (
  route: string,
  method: string = 'GET',
  payload: any = null,
  additionalHeaders: Headers = {}
): Promise<Object> => {
  if (!route) return Promise.reject(new Error('No url specified'));
  const url = `${apiUrl}${route}`;

  const accessToken = getAccessToken();
  const headers = {
    'Content-Type': 'application/json',
    ...additionalHeaders,
  };
  if (accessToken && !headers['Authorization']) {
    headers['Authorization'] = accessToken;
  }

  return fetch(url, {
    method,
    headers,
    body: payload ? JSON.stringify(payload) : null,
  }).then(checkStatus);
};

export const setStore = (newStore: Store): Store => (store = newStore);

// API URL
export const signup = (user: UserType): Promise<UserType> => request('/Users', 'POST', user);
export const login = (email: string, password: string): Promise<AuthType> =>
  request('/Users/login', 'POST', { email, password });
export const getUser = (id: number): Promise<UserType> => request(`/Users/${id}`);
export const updateUser = (user: UserType): Promise<UserType> =>
  request(`/Users/${user.id}`, 'PATCH', user);
