import React from "react";
import ReactDOM from "react-dom";
import { store } from "./redux/store/configureStore";
import { Provider } from "react-redux";
import App from "./App";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

axios.defaults.baseURL = "http://localhost:5050/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (req) => {
    console.log("req: ", req);
    return req;
  },
  (error) => {
    handleError(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    console.log("res:", res);
    return res;
  },
  (error) => {
    handleError(error);
    return Promise.reject(error);
  }
);

const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log(error.config);
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
