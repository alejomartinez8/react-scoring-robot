import React from "react";
import ReactDOM from "react-dom";
import { store } from "./redux/store/configureStore";
import { Provider } from "react-redux";
import App from "./App";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

axios.defaults.baseURL = "http://localhost:5050";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (req) => {
    console.log(req);
    return req;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    console.log(res);
    return res;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
