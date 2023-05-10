import { call, put, takeLatest } from "redux-saga/effects";
import { actionTypes, reduxUtil } from "../actions/dashBoard";

import apiConfig from "../constants/apiConfig";

import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
import Utils from "../utils";
const { defineActionLoading, defineActionSuccess, defineActionFailed } =
  reduxUtil;

const getDaysOfLastAndCurrentMonth = () => {
  const date = new Date();
  let currentMonthYear = date.getFullYear(),
    currentMonth = date.getMonth() + 1,
    lastMonth,
    lastMonthYear;

  if (currentMonth === 1) {
    lastMonth = 12;
    lastMonthYear = currentMonthYear - 1;
  } else {
    lastMonth = currentMonth - 1;
    lastMonthYear = currentMonthYear;
  }

  const currentMonthDayNumber =
    new Date(currentMonthYear, currentMonth, 0).getDate() || 0;
  const lastMothDayNumber =
    new Date(lastMonthYear, lastMonth, 0).getDate() || 0;
  return { lastMothDayNumber, currentMonthDayNumber, currentMonth, lastMonth };
};

const generateChartData = (
  currentMonth,
  currentMonthDayNumber,
  lastMonth,
  lastMothDayNumber,
  fetchChartData = []
) => {
  if (
    !currentMonthDayNumber ||
    !lastMothDayNumber ||
    !currentMonth ||
    !lastMonth
  )
    return [];

  const daysLength =
    currentMonthDayNumber >= lastMothDayNumber
      ? currentMonthDayNumber
      : lastMothDayNumber;

  const days = [];
  for (let i = 0; i < daysLength; i++) {
    days.push({
      day: i + 1 < 10 ? `0${i + 1}` : `${i + 1}`,
      currentMonthRevenue: 0,
      lastMonthRevenue: 0,
    });
  }
  fetchChartData.map((data) => {
    let day = parseInt(data.createdOnlyDate.slice(0, 2));
    let month = parseInt(data.createdOnlyDate.slice(3, 5));
    if (month === currentMonth) {
      days[day - 1] = {
        ...days[day - 1],
        currentMonthRevenue: data.revenue,
      };
    } else if (month === lastMonth) {
      days[day - 1] = {
        ...days[day - 1],
        lastMonthRevenue: data.revenue,
      };
    }
  });
  return days;
};

const { GET_REV_TABLE_DATA, GET_REV_VALUES_DATA } = actionTypes;

function* getRevenueTable({ payload: { params, onCompleted, onError } }) {
  const apiParams = apiConfig.dashBoard.getChartData;
  const searchParams = { params };
  try {
    const result = yield call(sendRequest, apiParams, searchParams);
    const { success, responseData } = result;

    if (success && responseData.result) {
      const {
        lastMothDayNumber,
        currentMonthDayNumber,
        currentMonth,
        lastMonth,
      } = yield getDaysOfLastAndCurrentMonth();
      const chartData = yield generateChartData(
        currentMonth,
        currentMonthDayNumber,
        lastMonth,
        lastMothDayNumber,
        responseData.data
      );
      yield put({
        type: defineActionSuccess(GET_REV_TABLE_DATA),
        data: chartData,
      });
    }
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    yield put({ type: defineActionFailed(GET_REV_TABLE_DATA) });
  }
}

function* getRevenueValues({ payload: { params, onCompleted, onError } }) {
  const apiParams = apiConfig.dashBoard.businessPerformance;
  const searchParams = { params };
  try {
    const result = yield call(sendRequest, apiParams, searchParams);
    const { success, responseData } = result;

    if (success && responseData.result) {
      yield put({
        type: defineActionSuccess(GET_REV_VALUES_DATA),
        data: responseData.data,
      });
    }
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    yield put({ type: defineActionFailed(GET_REV_VALUES_DATA) });
  }
}

const sagas = [
  takeLatest(defineActionLoading(GET_REV_TABLE_DATA), getRevenueTable),
  takeLatest(defineActionLoading(GET_REV_VALUES_DATA), getRevenueValues),
];

export default sagas;
