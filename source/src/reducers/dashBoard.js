import { actionTypes, reduxUtil } from "../actions/dashBoard";

const {
  createReducer,
  defineActionSuccess,
  defineActionLoading,
  defineActionFailed,
} = reduxUtil;

const { GET_REV_TABLE_DATA, GET_REV_VALUES_DATA } = actionTypes;

const initialState = {
  revenueTableData: [
    {
      createdOnlyDate: "01/01/2023",
      revenue: 0,
    },
  ],
  revenueTableLoading: false,
  revenueValuesLoading: false,
  revenueValues: {
    retailRevenue: 400000000000 ,
    meanPerCustomer: 200000,
    returnRevenue: 200000,
    numberOfBill: 200000,
    meanPerBill: 200000,
  },
};

const reducer = createReducer(
  {
    [defineActionLoading(GET_REV_TABLE_DATA)]: (state) => {
      return {
        ...state,
        revenueTableLoading: true,
      };
    },
    [defineActionSuccess(GET_REV_TABLE_DATA)]: (state, { data }) => {
      return {
        ...state,
        revenueTableData: [...data],
        revenueTableLoading: false,
      };
    },
    [defineActionFailed(GET_REV_TABLE_DATA)]: (state, action) => {
      return {
        ...state,
        revenueTableLoading: false,
      };
    },
    [defineActionLoading(GET_REV_VALUES_DATA)]: (state) => {
      return {
        ...state,
        revenueValuesLoading: true,
      };
    },
    [defineActionSuccess(GET_REV_VALUES_DATA)]: (state, { data }) => {
      return {
        ...state,
        revenueValues: { ...data },
        revenueValuesLoading: false,
      };
    },
    [defineActionFailed(GET_REV_VALUES_DATA)]: (state, action) => {
      return {
        ...state,
        revenueValuesLoading: false,
      };
    },
  },
  initialState
);

export default {
  reducer,
};
