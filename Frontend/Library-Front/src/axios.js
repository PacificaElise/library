/* eslint-disable */

import axios from 'axios';

// const token = document.cookie;
// const jwt = token.slice(6);

const instance = axios.create({
  baseURL: 'https://library-cleverland-2jfze.ondigitalocean.app',
});

instance.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return req;
  } else {
    req.headers.Authorization = 'application/json, text/plain, */*';
    return req;
  }
});

export default instance;
