import {
  ADD_USER,
  FETCH_RESEARCHERS,
  UPDATE_USER,
  UPDATE_USER_PASSWORD,
} from "../types";

const initialState = {
  researchers: [],
};

function researchersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RESEARCHERS:
      return {
        researchers: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        researchers: [...state.researchers, action.payload],
      };

    case UPDATE_USER:
      return {
        ...state,
        researchers: state.researchers.map((researcher) =>
          researcher.uuid === parseInt(action.payload.id)
            ? {
                ...researcher,
                email: action.payload.email,
                name: action.payload.name,
                phone: action.payload.phone,
                description: action.payload.description,
                image: action.payload.image, // Update the image
              }
            : researcher
        ),
      };
    case UPDATE_USER_PASSWORD:
      return {
        ...state,
        researchers: state.researchers.map((researcher) =>
          researcher.uuid === parseInt(action.payload.id)
            ? {
                ...researcher,
                password: action.payload.password,
              }
            : researcher
        ),
      };
    default:
      return state;
  }
}

export default researchersReducer;
