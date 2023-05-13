import { actionTypes, reduxUtil } from "../actions/order";

const { createReducer, defineActionSuccess, defineActionLoading } = reduxUtil;
const { GET_ORDER_LIST, CREATE_ORDER, ADD_NEW_CART, REMOVE_CART, UPDATE_CART } =
  actionTypes;

const initialState = {
  orderData: [],
  tbOrderLoading: false,
  createOrderLoading: false,
  cartsData: {
    "cart-0": {
      orderInfo: {},
      orderItems: [],
    },
  },
};

const reducer = createReducer(
  {
    [defineActionLoading(GET_ORDER_LIST)]: (state) => {
      return {
        ...state,
        tbOrderLoading: true,
      };
    },
    [defineActionSuccess(GET_ORDER_LIST)]: (state, { orderData }) => {
      return {
        ...state,
        orderData,
        tbOrderLoading: false,
      };
    },
    [defineActionLoading(CREATE_ORDER)]: (state) => {
      return {
        ...state,
        createOrderLoading: true,
      };
    },
    [defineActionSuccess(CREATE_ORDER)]: (state, payload) => {
      return {
        ...state,
        createOrderLoading: false,
      };
    },
    [defineActionSuccess(ADD_NEW_CART)]: (state, payload) => {
      console.log(payload);
      return {
        ...state,
      };
    },
  },
  initialState
);

export default {
  reducer,
};
