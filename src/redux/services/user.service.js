import axios from "axios";

export const userServices = {
  loadUser,
  login,
  register,
  verifyEmail,
  forgotPassword,
  validateResetToken,
  resetPassword,
  getAllUsers,
  getById,
  createUser,
  updateUser,
  deleteUser,
};

// loadUser
async function loadUser() {
  return axios.get(`/users`).then(handleResponse).catch(handleError);
}

// login
async function login(email, password) {
  return axios
    .post("/users/login", JSON.stringify({ email, password }))
    .then(handleResponse)
    .catch(handleError);
}

// register
async function register(user) {
  return axios
    .post("/users/register", JSON.stringify(user))
    .then(handleResponse)
    .catch(handleError);
}

// verifyEmail
function verifyEmail(token) {
  return axios
    .post("/users/verify-email", JSON.stringify({ token }))
    .then(handleResponse)
    .catch(handleError);
}

// forgotPassword
function forgotPassword(email) {
  return axios
    .post("/users/forgot-password", JSON.stringify({ email }))
    .then(handleResponse)
    .catch(handleError);
}

// validate reset token
function validateResetToken(token) {
  return axios
    .post("/users/validate-reset-token", JSON.stringify({ token }))
    .then(handleResponse)
    .catch(handleError);
}

// reset password
function resetPassword({ token, password, confirmPassword }) {
  return axios
    .post(
      "/users/reset-password",
      JSON.stringify({ token, password, confirmPassword })
    )
    .then(handleResponse)
    .catch(handleError);
}

// getAllUsers
function getAllUsers() {
  return axios.get(`/users/getAll`).then(handleResponse).catch(handleError);
}

function getById(id) {
  return axios.get(`/users/${id}`).then(handleResponse).catch(handleError);
}

// update
function updateUser(id, user) {
  return axios
    .put(`/users/${id}`, JSON.stringify(user))
    .then(handleResponse)
    .catch(handleError);
}

// createUser
function createUser(user) {
  return axios
    .post("/users", JSON.stringify(user))
    .then(handleResponse)
    .catch(handleError);
}

// deleteUSer
function deleteUser(id) {
  return axios.delete(`/users/${id}`).then(handleResponse).catch(handleError);
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
