import { FETCH_COMPANIES } from "../types";

const initialState = {
  companies: [],
};

function companiesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMPANIES:
      return {
        companies: action.payload,
      };
    default:
      return state;
  }
}

export default companiesReducer;
