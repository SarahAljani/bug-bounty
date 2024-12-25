import { UPDATE_COMPANY_PROFILE } from "../types";

const initialState = {
  companyData: {},
};

function companyDataReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_COMPANY_PROFILE:
      return {
        ...state,
        companyData: { ...state.companyData, ...action.payload },
      };

    default:
      return state;
  }
}

export default companyDataReducer;
