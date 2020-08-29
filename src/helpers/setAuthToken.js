import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    localStorage.setItem('token', token);
    // console.log('token cargado: ', token);
  } else {
    delete axios.defaults.headers.common;
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
