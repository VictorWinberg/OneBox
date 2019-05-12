import { createStore, combineReducers } from "redux";
import { combineForms } from "react-redux-form";

const initialForm = { username: "", room: "", message: "" };
const form = combineForms({ data: initialForm });

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
const reducers = combineReducers({ form, counter });

export default createStore(reducers);
