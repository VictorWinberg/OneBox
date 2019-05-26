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

const reducers = combineReducers({ forms, socket });

export default createStore(reducers);
