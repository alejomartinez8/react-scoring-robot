import axios from "axios";
import { logout } from "../actions/user.actions";

const config = {
  apiUrl: "http://localhost:5050/users",
};

export const userServices = {
  loadUser,
  login,
  register,
  verifyEmail,
  forgotPassword,
  validateResetToken,
  resetPassword,
};

// loadUser
async function loadUser() {
  return axios.get(`${config.apiUrl}`).then(handleResponse).catch(handleError);
}

// login
async function login(email, password) {
  const requestOptions = {
    method: "post",
    url: `${config.apiUrl}/login`,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({ email, password }),
  };

  return axios(requestOptions).then(handleResponse).catch(handleError);
}

// register
async function register(user) {
  const requestOptions = {
    method: "post",
    url: `${config.apiUrl}/register`,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(user),
  };

  return axios(requestOptions).then(handleResponse).catch(handleError);
}

// verifyEmail
function verifyEmail(token) {
  const requestOptions = {
    method: "post",
    url: `${config.apiUrl}/verify-email`,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({ token }),
  };

  return axios(requestOptions).then(handleResponse).catch(handleError);
}

// forgotPassword
function forgotPassword(email) {
  const requestOptions = {
    method: "post",
    url: `${config.apiUrl}/forgot-password`,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({ email }),
  };

  return axios(requestOptions).then(handleResponse).catch(handleError);
}

// validate reset token
function validateResetToken(token) {
  const requestOptions = {
    method: "post",
    url: `${config.apiUrl}/validate-reset-token`,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({ token }),
  };

  return axios(requestOptions).then(handleResponse).catch(handleError);
}

// reset password
async function resetPassword({ token, password, confirmPassword }) {
  const requestOptions = {
    method: "post",
    url: `${config.apiUrl}/reset-password`,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({ token, password, confirmPassword }),
  };

  return axios(requestOptions).then(handleResponse).catch(handleError);
}

// handleResponse
function handleResponse(response) {
  console.log("handleResponse: ", response);
  return response.data;
}

//handleError
function handleError(error) {
  console.log("handleError: ", error.response);
  if (error.response.status === 401) {
    logout();
  }
  const _error =
    (error.response.data && error.response.data.message) ||
    error.response.status;
  return Promise.reject(_error);
}
