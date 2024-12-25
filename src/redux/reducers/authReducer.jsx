import {
  SET_CURRENT_USER,
  UPDATE_LOGGED_IN,
  UPDATE_USER_ID,
  SET_STATUS,
} from "../types";

const initialState = {
  loggedIn: localStorage.getItem("loggedIn") === "true" || false,
  userId: localStorage.getItem("userId") || null,
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  status: localStorage.getItem("status") || null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOGGED_IN: // Correct action type constant
      console.log();
      localStorage.setItem("loggedIn", action.payload);
      console.log("logged in updated");
      return {
        ...state,
        loggedIn: action.payload,
      };
    case UPDATE_USER_ID:
      localStorage.setItem("userId", action.payload);
      console.log("userId in updated");
      return {
        ...state,
        userId: action.payload,
      };
    case SET_CURRENT_USER:
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      console.log("user in updated");
      return {
        ...state,
        currentUser: action.payload,
      };
    case SET_STATUS:
      localStorage.setItem("status", action.payload);
      console.log("status in updated");
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
}

export default authReducer;
