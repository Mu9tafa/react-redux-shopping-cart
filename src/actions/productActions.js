import { FETCH_PRODUCTS } from "./../type";
export const fetchProducts = () => async (dispatch) => {
   const response = await fetch("/api/products");
   const data = await response.json();
   dispatch({
      type: FETCH_PRODUCTS,
      payload: data,
   });
};
