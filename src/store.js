import { createStore, combineReducers } from "redux";
import { combineForms } from "react-redux-form";

const forms = combineForms(
  { login: { username: "", room: "", color: "" }, data: { message: "" } },
  "forms"
);

const socket = (state = null, action) => {
  switch (action.type) {
    case "SET_SOCKET":
      return action.socket;
    default:
      return state;
  }
};

const counter = (state = 0, action) => {
  switch (action.type) {
    case "INC":
      return state + 1;
    case "DEC":
      return state - 1;
    case "RESET":
      return 0;
    default:
      return state;
  }
};

const page = (state = "GET_USERNAME", action) => {
  switch (action.type) {
    case "SET_PAGE":
      return action.page;
    default:
      return state;
  }
};

const reducers = combineReducers({ forms, counter, page, socket });

export default createStore(reducers);
