import {
  ADD_USER,
  FETCH_COMPANIES,
  FETCH_RESEARCHERS,
  UPDATE_USER,
  UPDATE_USER_PASSWORD,
} from "../types";

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});
export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});
export const updateUserPassword = (user) => ({
  type: UPDATE_USER_PASSWORD,
  payload: user,
});

export const fetchResearchers = (researchers) => ({
  type: FETCH_RESEARCHERS,
  payload: researchers,
});
export const fetchCompanies = (companies) => ({
  type: FETCH_COMPANIES,
  payload: companies,
});
