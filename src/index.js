import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import io from "socket.io-client";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store";

require("dotenv").config();

const socket = io(`localhost:${process.env.PORT || 4000}`);
store.dispatch({ type: "SET_SOCKET", socket });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
