import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/customer';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';
import { UserTypes } from '../constants';
import moment from 'moment';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_CUSTOMER_LIST,
    GET_CUSTOMER_BY_ID,
    CREATE_CUSTOMER,
    UPDATE_CUSTOMER,
    DELETE_CUSTOMER,
    GET_PROFILE_CUSTOMER,
    UPDATE_PROFILE_CUSTOMER,
    REGISTER_CUSTOMER,
    GET_CUSTOMER_AUTOCOMPLE
} = actionTypes;


function* getCustomerList({ payload: { params } }) {

    const apiParams = apiConfig.customer.getList;
    const searchParams = { page: params.page, size: params.size , kind: UserTypes.ADMIN};
    if(params.search) {
        if(params.search.fullName) {
            searchParams.fullName = params.search.fullName
        }
        if(params.search.phone) {
            searchParams.phone = params.search.phone
        }
    }
    try {
        const result = yield call(sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(GET_CUSTOMER_LIST),
            customerData: result.responseData && result.responseData.data
        });
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_CUSTOMER_LIST) });
    }
}

function* getCustomerById({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.customer.getById,
            path: `${apiConfig.customer.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

function* createCustomer({ payload: { params, onCompleted, onError } }) {
    
    if(params.avatarPath){
        params.customerAvatarPath=params.avatarPath
    }
    if(params.saleOff){
        params.saleOff=Number(params.saleOff)
    }
    if(params.birthday){
           let date= moment(params.birthday._d).format("YYYY-MM-DDTHH:mm:ss.SSS")
           function convert(str) {
            var date = new Date(str),
              mnth = ("0" + (date.getMonth() + 1)).slice(-2),
              day = ("0" + date.getDate()).slice(-2);
            return [day, mnth, date.getFullYear()].join("/");
          }
          let date_1= convert(date)
          params.birthday = date_1+" 00:00:00"
    }
    try {
        const apiParams =  apiConfig.customer.create 
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}
function* registerCustomer({ payload: { params, onCompleted, onError } }) {

    try {
        const apiParams =  apiConfig.customer.register 
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

function* updateCustomer({ payload: { params, onCompleted, onError } }) {
    if(params.birthday){
        let date= moment(params.birthday._d).format("YYYY-MM-DDTHH:mm:ss.SSS")
        function convert(str) {
         var date = new Date(str),
           mnth = ("0" + (date.getMonth() + 1)).slice(-2),
           day = ("0" + date.getDate()).slice(-2);
         return [day, mnth, date.getFullYear()].join("/");
       }
       let date_1= convert(date)
       params.birthday = date_1+" 00:00:00"
 }
    try {
        const apiParams =  apiConfig.customer.update 
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

function* deleteCustomer({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.customer.delete,
            path: `${apiConfig.customer.delete.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);

        const { success, responseData } = result;
        if(!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_CUSTOMER) });
    }
    catch(error) {
        yield put({ type: defineActionFailed(DELETE_CUSTOMER) });
        onError(error);
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_CUSTOMER_LIST), getCustomerList),
    takeLatest(GET_CUSTOMER_BY_ID, getCustomerById),
    takeLatest(CREATE_CUSTOMER, createCustomer),
    takeLatest(REGISTER_CUSTOMER, registerCustomer),
    takeLatest(UPDATE_CUSTOMER, updateCustomer),
    takeLatest(defineActionLoading(DELETE_CUSTOMER), deleteCustomer),
]

export default sagas;