import axios from "axios";

export const authServices = {
  login,
  loginGoogle,
  loginFacebook,
  register,
  verifyEmail,
  forgotPassword,
  validateResetToken,
  resetPassword,
};

// login
async function login(email, password) {
  return axios
    .post("/auth/login", JSON.stringify({ email, password }))
    .then(handleResponse)
    .catch(handleError);
}

// login google
async function loginGoogle(access_token) {
  return axios
    .post("/auth/google/token", JSON.stringify({ access_token }))
    .then(handleResponse)
    .catch(handleError);
}

// login facebook
async function loginFacebook(access_token) {
  return axios
    .post("/auth/facebook/token", JSON.stringify({ access_token }))
    .then(handleResponse)
    .catch(handleError);
}

// register
async function register(user) {
  return axios
    .post("/auth/register", JSON.stringify(user))
    .then(handleResponse)
    .catch(handleError);
}

// verifyEmail
function verifyEmail(token) {
  return axios
    .post("/auth/verify-email", JSON.stringify({ token }))
    .then(handleResponse)
    .catch(handleError);
}

// forgotPassword
function forgotPassword(email) {
  return axios
    .post("/auth/forgot-password", JSON.stringify({ email }))
    .then(handleResponse)
    .catch(handleError);
}

// validate reset token
function validateResetToken(token) {
  return axios
    .post("/auth/validate-reset-token", JSON.stringify({ token }))
    .then(handleResponse)
    .catch(handleError);
}

// reset password
function resetPassword({ token, password, confirmPassword }) {
  return axios
    .post(
      "/auth/reset-password",
      JSON.stringify({ token, password, confirmPassword })
    )
    .then(handleResponse)
    .catch(handleError);
}

// handleResponse
function handleResponse(response) {
  return response.data;
}

//handleError
function handleError(error) {
  throw (
    (error.response.data && error.response.data.message) || error.response.status
  );
}
