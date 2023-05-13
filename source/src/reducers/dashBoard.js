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
      currentMonthRevenue: 0,
      lastMonthRevenue: 0,
    },
  ],
  revenueTableLoading: false,
  revenueValuesLoading: false,
  revenueValues: {
    retailRevenue: 0 ,
    meanPerCustomer: 0,
    returnRevenue: 0,
    numberOfBill: 0,
    meanPerBill: 0,
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
