import moment from "moment";
import { call, put, takeLatest } from "redux-saga/effects";
import { actionTypes, reduxUtil } from "../actions/importExport";

import apiConfig from "../constants/apiConfig";

import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const { defineActionLoading, defineActionSuccess, defineActionFailed } =
  reduxUtil;

const {
  GET_IMPORT_EXPORT_LIST,
  GET_CATEGORY_AUTOCOMPLE_IMPORT_EXPORT,
  DELETE_IMPORT_EXPORT,
} = actionTypes;

function* getImportExportList({ payload: { params } }) {
  const apiParams = apiConfig.importExport.getList;
  const searchParams = { page: params.page, size: params.size };
  searchParams.kind = params.kind;

  if (params.search) {
    if (params.search.code) searchParams.code = params.search.code;
    if (params.search.categoryId)
      searchParams.categoryId = params.search.categoryId;
    if (params.search.date) {
      function convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("/");
      }
      searchParams.from =
        convert(params.search.date[0]).toString() + " 00:00:00";
      searchParams.to = convert(params.search.date[1]).toString() + " 23:59:59";
    }
  }

  try {
    const result = yield call(sendRequest, apiParams, searchParams);
    yield put({
      type: defineActionSuccess(GET_IMPORT_EXPORT_LIST),
      importExportDataList: result.responseData && {
        ...result.responseData.data,
      },
    });
  } catch (error) {
    yield put({ type: defineActionFailed(GET_IMPORT_EXPORT_LIST) });
  }
}

function* getCategoryAutoCompleteImportExport({ payload: { kind } }) {
  const apiParams = apiConfig.importExport.categoryAutoComplete;

  try {
    const result = yield call(sendRequest, apiParams, { kind });
    yield put({
      type: defineActionSuccess(GET_CATEGORY_AUTOCOMPLE_IMPORT_EXPORT),
      categoryAutoCompleteImportExport: result.responseData && {
        ...result.responseData.data,
      },
    });
  } catch (error) {
    yield put({
      type: defineActionFailed(GET_CATEGORY_AUTOCOMPLE_IMPORT_EXPORT),
    });
  }
}

function* createImportExports({ payload: { params, onCompleted, onError } }) {
  params.filePath = params.avatar;
  try {
    const result = yield call(
      sendRequest,
      apiConfig.importExport.create,
      params
    );
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

function* updateImportExports({ payload: { params, onCompleted, onError } }) {
  try {
    const result = yield call(
      sendRequest,
      apiConfig.importExport.update,
      params
    );
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

function* deleteImportExports({ payload: { params, onCompleted, onError } }) {
  try {
    const apiParams = {
      ...apiConfig.news.delete,
      path: `${apiConfig.importExport.delete.path}/${params.id}`,
    };
    const result = yield call(sendRequest, apiParams);
    handleApiResponse(result, onCompleted, onError);

    const { success, responseData } = result;
    if (!success || !responseData.result)
      yield put({ type: defineActionFailed(DELETE_IMPORT_EXPORT) });
  } catch (error) {
    yield put({ type: defineActionFailed(DELETE_IMPORT_EXPORT) });
    onError(error);
  }
}
function* getImportExportById({ payload: { params, onCompleted, onError } }) {
  try {
    //Define which Api and its path
    const apiParams = {
      ...apiConfig.importExport.getById,
      path: `${apiConfig.importExport.getById.path}/${params.id}`,
    };
    const result = yield call(sendRequest, apiParams);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}
const sagas = [
  takeLatest(defineActionLoading(GET_IMPORT_EXPORT_LIST), getImportExportList),
  takeLatest(
    defineActionLoading(GET_CATEGORY_AUTOCOMPLE_IMPORT_EXPORT),
    getCategoryAutoCompleteImportExport
  ),
  takeLatest(actionTypes.CREATE_IMPORT_EXPORT, createImportExports),
  takeLatest(actionTypes.UPDATE_IMPORT_EXPORT, updateImportExports),
  takeLatest(actionTypes.GET_IMPORT_EXPORT_BY_ID, getImportExportById),
  takeLatest(defineActionLoading(DELETE_IMPORT_EXPORT), deleteImportExports),
];

export default sagas;
