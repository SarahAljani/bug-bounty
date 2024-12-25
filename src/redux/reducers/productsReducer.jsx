import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCTS,
  UPDATE_PRODUCT,
} from "../types";

const initialState = {
  products: [],
};

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        products: action.payload,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.uuid === parseInt(action.payload.id)
            ? {
                ...product,
                title: action.payload.title,
                url: action.payload.url,
                description: action.payload,
              }
            : product
        ),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.uuid !== action.payload
        ),
      };
    default:
      return state;
  }
}

export default productsReducer;
