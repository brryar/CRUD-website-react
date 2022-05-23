import { FETCH_PRODUCTS, FETCH_PRODUCTBYID } from "../actions/actionType";

const initialState = {
  products: [],
  product: null,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case FETCH_PRODUCTBYID:
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
