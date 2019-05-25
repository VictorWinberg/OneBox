import { createStore, combineReducers } from "redux";
import { combineForms } from "react-redux-form";

const initialForm = { username: "", room: "", message: "" };
const forms = combineForms({ data: initialForm }, "forms");

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

const page = (state = "USERNAME", action) => {
  switch (action.type) {
    case "SET_PAGE":
      return action.payload;
    default:
      return state;
  }
};
const reducers = combineReducers({ forms, counter, page });

export default createStore(reducers);
