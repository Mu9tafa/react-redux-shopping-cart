import { FILTER_PRODUCTS_BY_SIZE } from "./../type";

export const filterReducer = (state = {}, action) => {
   switch (action.type) {
      case FILTER_PRODUCTS_BY_SIZE:
         return {
            ...state,
            filteredProducts: action.payload.filteredProducts,
            size: action.payload.size,
         };
      default:
         return state;
   }
};
