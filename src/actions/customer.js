import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('CUSTOMER');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_CUSTOMER_LIST: defineAction('GET_CUSTOMER_LIST'),
    CREATE_CUSTOMER: defineAction('CREATE_CUSTOMER'),
    GET_CUSTOMER_BY_ID: defineAction('GET_CUSTOMER_BY_ID'),
    UPDATE_CUSTOMER: defineAction('UPDATE_CUSTOMER'),
    DELETE_CUSTOMER: defineAction('DELETE_CUSTOMER'),
    REGISTER_CUSTOMER: defineAction('REGISTER_CUSTOMER'),
    UPDATE_PROFILE_CUSTOMER: defineAction('UPDATE_PROFILE_CUSTOMER'),
    GET_PROFILE_CUSTOMER: defineAction('GET_PROFILE_CUSTOMER'),
    GET_CUSTOMER_AUTOCOMPLE: defineAction('GET_CUSTOMER_AUTOCOMPLE'),
}

export const actions = {
    getCustomerList: createActionWithLoading(actionTypes.GET_CUSTOMER_LIST),
    createCustomer: createAction(actionTypes.CREATE_CUSTOMER),
    getCustomerById: createAction(actionTypes.GET_CUSTOMER_BY_ID),
    updateCustomer: createAction(actionTypes.UPDATE_CUSTOMER),
    deleteCustomer: createActionWithLoading(actionTypes.DELETE_CUSTOMER),
    registerCustomer: createAction(actionTypes.REGISTER_CUSTOMER),
    updateProfileCustomer:createAction(actionTypes.UPDATE_PROFILE_CUSTOMER),
    getProfileCustomer:createAction(actionTypes.GET_PROFILE_CUSTOMER),
    getCustomerAutoComplete:createActionWithLoading(actionTypes.GET_CUSTOMER_AUTOCOMPLE)
}