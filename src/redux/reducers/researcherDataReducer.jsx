import { UPDATE_RESEARCHER_PROFILE } from "../types";

const initialState = {
  researcherData: {},
};

function researcherDataReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_RESEARCHER_PROFILE:
      return {
        ...state,
        researcherData: { ...state.companyData, ...action.payload },
      };

    default:
      return state;
  }
}

export default researcherDataReducer;
