import { UPDATE_COUNT_ACCEPT, UPDATE_COUNT_PENDING } from "../types";

const initialState = {
  pending: 0,
  accept: 0,
};

function chartsReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_COUNT_PENDING:
      return {
        ...state,
        pending: action.payload,
      };
    case UPDATE_COUNT_ACCEPT:
      return {
        ...state,
        accept: action.payload,
      };
    default:
      return state;
  }
}

export default chartsReducer;
