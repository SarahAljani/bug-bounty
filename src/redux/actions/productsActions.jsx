import { ADD_PRODUCT, DELETE_PRODUCT, FETCH_PRODUCTS, UPDATE_PRODUCT } from "../types";

export const fetch_products = (products) => ({
  type: FETCH_PRODUCTS,
  payload: products,
});
export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});
export const updateProduct = (productId) => ({
  type: UPDATE_PRODUCT,
  payload: productId,
});
export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  payload: productId,
});