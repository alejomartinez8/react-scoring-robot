import React from "react";
import ReactDOM from "react-dom";
import { store } from "./redux/store/configureStore";
import { Provider } from "react-redux";
import App from "./App";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./bootstrap-theme.css";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

if (process.env.NODE_ENV === "development") {
  axios.interceptors.request.use(
    (req) => {
      console.log("req: ", req);
      return req;
    },
    (error) => {
      console.log(error.toJSON());
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (res) => {
      console.log("res:", res);
      return res;
    },
    (error) => {
      console.log(error.toJSON());
      return Promise.reject(error);
    }
  );
} else {
  console.log = () => {};
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
