import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore,applyMiddleware } from "redux";

import App from "./components/app";
import reducers from "./reducers";
import logger from 'redux-logger';

ReactDOM.render(
  <Provider store={createStore(reducers, applyMiddleware(logger))}>
    <App />
  </Provider>,
  document.querySelector(".container")
);
