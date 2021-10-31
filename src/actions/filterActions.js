import { FILTER_PRODUCTS_BY_SIZE } from "./../type";
export const filterProducts = (products, filters) => (dispatch) => {
   let filteredProducts = products.filter((product) => {
      if (filters.size === "") {
         return product;
      } else {
         return product.availableSizes.includes(filters.size);
      }
   });
   dispatch({
      type: FILTER_PRODUCTS_BY_SIZE,
      payload: {
         filteredProducts,
         size: filters.size,
      },
   });
};
