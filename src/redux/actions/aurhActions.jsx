import {
  UPDATE_LOGGED_IN,
  UPDATE_USER_ID,
  SET_CURRENT_USER,
  SET_STATUS,
} from "../types";

export const updateLoggedIn = (boolianValue) => ({
  type: UPDATE_LOGGED_IN,
  payload: boolianValue,
});
export const updateUserId = (userId) => ({
  type: UPDATE_USER_ID,
  payload: userId,
});

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});
export const setStatus = (status) => ({
  type: SET_STATUS,
  payload: status,
});
