import axios from 'axios';

const config = {
  apiUrl: 'http://localhost:5050/users'
};

export const userServices = {
  loadUser,
  login,
  register,
  forgotPassword
};

// loadUser
async function loadUser() {
  return axios.get(`${config.apiUrl}`).then(handleResponse).catch(handleError);
}

// login
async function login(email, password) {
  const requestOptions = {
    method: 'post',
    url: `${config.apiUrl}/login`,
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ email, password })
  };

  return axios(requestOptions).then(handleResponse).catch(handleError);
}

// register
async function register(user) {
  const requestOptions = {
    method: 'post',
    url: `${config.apiUrl}/register`,
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(user)
  };

  return axios(requestOptions).then(handleResponse).catch(handleError);
}

// forgotPassword
function forgotPassword(email) {
  const requestOptions = {
    method: 'post',
    url: `${config.apiUrl}/forgot-password`,
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ email })
  };

  return axios(requestOptions).then(handleResponse).catch(handleError);
}

// handleResponse
function handleResponse(response) {
  console.log('handleResponse: ', response);
  return response.data;
}

//handleResponse
function handleError(error) {
  console.log('handleError: ', error.response);
  if (error.response.status === 401) {
    console.log('logout');
  }
  const _error = (error.response.data && error.response.data.message) || error.response.status;
  return Promise.reject(_error);
}
