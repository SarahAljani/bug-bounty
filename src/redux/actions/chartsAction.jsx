import { UPDATE_COUNT_ACCEPT, UPDATE_COUNT_PENDING } from "../types";

export const updateCountPending = (n) => ({
  type: UPDATE_COUNT_PENDING,
  payload: n,
});
export const updateCountAccept = (n) => ({
  type: UPDATE_COUNT_ACCEPT,
  payload: n,
});
