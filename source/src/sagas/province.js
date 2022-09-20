import { actionType, reduxUtil } from "../actions/province";
import { UserTypes } from "../constants";
import apiConfig from "../constants/apiConfig";
import { call, put, takeLatest } from "redux-saga/effects";
import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const { defineActionSuccess, defineActionFailed, defineActionLoading } =
  reduxUtil;
const {
  GET_PROVINCE_LIST,
  GET_PROVINCE_BY_ID,
  CREATE_PROVINCE,
  UPDATE_PROVINCE,
  DELETE_PROVINCE,
  GET_PROVINCE_AUTOCOMPLETE,
} = actionType;

function* getProvinceList({ payload: { params } }) {
  const apiParams = apiConfig.province.getList;
  
  let searchParams = {
    page: params.page,
    size: params.size
  };
  if(params.kind === "PROVINCE_KIND_DISTRICT"){
    searchParams.kind="PROVINCE_KIND_DISTRICT"
  }else if(params.kind === "PROVINCE_KIND_COMMUNE"){
    searchParams.kind="PROVINCE_KIND_COMMUNE"
  }else{
    searchParams.kind="PROVINCE_KIND_PROVINCE"
  }
  if(params.parentId){
    searchParams.parentId=params.parentId
  }
  if (params.search) {
    if (params.search.status) searchParams.status = params.search.status;
    if (params.search.name) {
      searchParams.name = params.search.name;
    }
  }
  try {
    const result = yield call(sendRequest, apiParams, searchParams);
    yield put({
      type: defineActionSuccess(GET_PROVINCE_LIST),
      provinceData: result.responseData && result.responseData.data,
    });
  } catch (error) {
    yield put({ type: defineActionFailed(GET_PROVINCE_LIST) });
  }
}
function* getProvinceById({ payload: { params, onCompleted, onError } }) {
  try {
    const apiParams = {
      ...apiConfig.province.getById,
      path: `${apiConfig.province.getById.path}/${params.id}`,
    };
    const result = yield call(sendRequest, apiParams);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}
function* createProvince({ payload: { params, onCompleted, onError } }) {
  try {
    const result = yield call(sendRequest, apiConfig.province.create, params);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}
function* updateProvince ({payload:{params, onCompleted, onError}}){
  try {
    console.log(params)
    const result = yield call(sendRequest, apiConfig.province.update,params)
    handleApiResponse(result, onCompleted, onError)
  } catch (error) {
    onError(error)
  }
}
function* deleteProvince({ payload: { params, onCompleted, onError } }) {
  try {
    const apiParams = {
      ...apiConfig.province.delete,
      path: `${apiConfig.province.delete.path}/${params.id}`,
    };

    const result = yield call(sendRequest, apiParams);
    handleApiResponse(result, onCompleted, onError)
    const {success, responseData}= result
    if(!success || !responseData.result){
      yield put({type:defineActionFailed(DELETE_PROVINCE)})
    }
  } catch (error) {
    yield put({type:defineActionFailed(DELETE_PROVINCE)})
    onError(error)
  }
}
const sagas = [
  takeLatest(defineActionLoading(GET_PROVINCE_LIST), getProvinceList),
  takeLatest(actionType.GET_PROVINCE_BY_ID,getProvinceById),
  takeLatest(actionType.CREATE_PROVINCE,createProvince),
  takeLatest(actionType.UPDATE_PROVINCE, updateProvince),
  takeLatest(defineActionLoading(DELETE_PROVINCE),deleteProvince)
];

export default sagas;
