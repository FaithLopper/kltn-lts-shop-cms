import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { sendRequest } from "../services/apiService";
import { actionTypes, reduxUtil } from "../actions/category";
import apiConfig from "../constants/apiConfig";
import { handleApiResponse } from "../utils/apiHelper";
import { categoryKinds } from "../constants/masterData";

const { defineActionLoading, defineActionSuccess, defineActionFailed } =
  reduxUtil;

const {
  GET_CATEGORY_LIST,
  GET_CATEGORY_BY_ID,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CREATE_CATEGORY,
  GET_CATEGORY_AUTOCOMPLETE,
} = actionTypes;

function* getCategoryList({ payload: { params } }) {
  let apiParams = apiConfig.masterCategory.getList;
  const searchParams = { page: params.page, size: params.size };

  if (params.kind) {
    searchParams.kind = params.kind;
    if (params.kind === categoryKinds.CATEGORY_KIND_NEWS)
      apiParams = { ...apiConfig.tenantCategory.getList };
  }

  if (params.parentId) {
    searchParams.parentId = params.parentId;
  }

  if (params.search) {
    if (params.search.name) {
      searchParams.name = params.search.name;
    }
    if (params.search.status) {
      searchParams.status = params.search.status;
    }
  }
  try {
    const result = yield call(sendRequest, apiParams, searchParams);
    yield put({
      type: defineActionSuccess(GET_CATEGORY_LIST),
      categoryData: result.responseData && result.responseData.data,
    });
  } catch (error) {
    yield put({ type: defineActionFailed(GET_CATEGORY_LIST) });
  }
}

function* getCategoryById({ payload: { params, onCompleted, onError } }) {
  try {
    let api = apiConfig.masterCategory.getById;
    if (params.kind) {
      if (params.kind === categoryKinds.CATEGORY_KIND_NEWS)
        api = { ...apiConfig.tenantCategory.getById };
    }

    const apiParams = {
      ...api,
      path: `${api.path}/${params.id}`,
    };
    const result = yield call(sendRequest, apiParams);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

function* createCategory({ payload: { params, onCompleted, onError } }) {
  try {
    let apiParams = apiConfig.masterCategory.create;

    if (params.kind) {
      if (params.kind === categoryKinds.CATEGORY_KIND_NEWS)
        apiParams = { ...apiConfig.tenantCategory.create };
    }
    const result = yield call(sendRequest, apiParams, params);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

function* updateCategory({ payload: { params, onCompleted, onError } }) {
  try {
    let apiParams = apiConfig.masterCategory.update;

    if (params.kind) {
      if (params.kind === categoryKinds.CATEGORY_KIND_NEWS)
        apiParams = { ...apiConfig.tenantCategory.update };
    }
    const result = yield call(sendRequest, apiParams, params);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

function* deleteCategory({ payload: { params, onCompleted, onError } }) {
  try {
    let api = apiConfig.masterCategory.delete;
    if (params.kind) {
      if (params.kind === categoryKinds.CATEGORY_KIND_NEWS)
        api = { ...apiConfig.tenantCategory.delete };
    }

    console.log(api);
    let apiParams = {
      ...api,
      path: `${api.path}/${params.id}`,
    };
    const { success, responseData } = yield call(sendRequest, apiParams);
    handleApiResponse({ success, responseData }, onCompleted, onError);

    if (!success || !responseData.result)
      yield put({ type: defineActionFailed(DELETE_CATEGORY) });
  } catch (error) {
    yield put({ type: defineActionFailed(DELETE_CATEGORY) });
    onError(error);
  }
}

function* getCategoryAutoComplete({ payload: { kind } }) {
  let apiParams = apiConfig.masterCategory.categoryAutoComplete;

  if (kind) {
    if (kind === categoryKinds.CATEGORY_KIND_NEWS)
      apiParams = { ...apiConfig.tenantCategory.categoryAutoComplete };
  }
  try {
    const result = yield call(sendRequest, apiParams, { kind });
    yield put({
      type: defineActionSuccess(GET_CATEGORY_AUTOCOMPLETE),
      categoryAutoComplete: result.responseData && {
        ...result.responseData.data,
      },
      kind,
    });
  } catch (error) {
    yield put({ type: defineActionFailed(GET_CATEGORY_AUTOCOMPLETE) });
  }
}

const sagas = [
  takeLatest(defineActionLoading(GET_CATEGORY_LIST), getCategoryList),
  takeLatest(GET_CATEGORY_BY_ID, getCategoryById),
  takeLatest(UPDATE_CATEGORY, updateCategory),
  takeLatest(CREATE_CATEGORY, createCategory),
  takeLatest(defineActionLoading(DELETE_CATEGORY), deleteCategory),
  takeEvery(
    defineActionLoading(GET_CATEGORY_AUTOCOMPLETE),
    getCategoryAutoComplete
  ),
];

export default sagas;
