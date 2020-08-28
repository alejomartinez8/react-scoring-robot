import axios from 'axios';

const config = {
  apiUrl: 'http://localhost:5050'
};

export const accountService = {
  login
};

async function login(email, password) {
  const options = {
    method: 'post',
    url: `${config.apiUrl}/accounts/authenticate`,
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ email, password })
  };

  return axios(options).then(handleResponse).catch(handleError);
}

function handleResponse(response) {
  return response.data;
}

function handleError(error) {
  if (error.response.status === 401) {
    console.log('logout');
  }
  const _error = (error.response.data && error.response.data.message) || error.response.status;
  return Promise.reject(_error);
}
