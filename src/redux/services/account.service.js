import axios from 'axios';

export const accountService = {
  login
};

function login(email, password) {
  const requesOptions = {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };

  return axios
    .post(`${config.apiUrl}/accounts/authenticate`)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    });
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        console.log('logout');
      }

      const error = (data && data.messagge) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
