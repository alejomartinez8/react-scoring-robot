import axios from "axios"

const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token)
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` }
  } else {
    delete axios.defaults.headers.common
    localStorage.removeItem("token")
  }
}

export default setAuthToken
