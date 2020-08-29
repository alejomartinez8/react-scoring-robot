import axios from 'axios';

const config = {
  apiUrl: 'http://localhost:5050'
};

export const userServices = {
  loadUser,
  login,
  register
};

async function loadUser() {
  return axios.get(`${config.apiUrl}/users/`).then(handleResponse).catch(handleError);
}

async function login(email, password) {
  const requestOptions = {
    method: 'post',
    url: `${config.apiUrl}/users/login`,
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ email, password })
  };

  return axios(requestOptions).then(handleResponse).catch(handleError);
}

async function register(params) {
  const requestOptions = {
    method: 'post',
    url: `${config.apiUrl}/user/register`,
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(params)
  };

  return axios(requestOptions).then(handleResponse).catch(handleError);
}

function handleResponse(response) {
  console.log('handleResponse: ', response);
  return response.data;
}

function handleError(error) {
  console.log('handleError: ', error.response);
  if (error.response.status === 401) {
    console.log('logout');
  }
  const _error = (error.response.data && error.response.data.message) || error.response.status;
  return Promise.reject(_error);
}
