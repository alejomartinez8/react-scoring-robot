import React from "react"
import ReactDOM from "react-dom"
import { store } from "./redux/store/configureStore"
import { Provider } from "react-redux"
import App from "./App"

import "bootstrap/dist/css/bootstrap.css"
import "./index.css"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
