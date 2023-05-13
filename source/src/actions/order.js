import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('ORDER');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_ORDER_LIST: defineAction('GET_ORDER_LIST'),
    GET_ORDER_BY_ID: defineAction('GET_ORDER_BY_ID'),
    UPDATE_STATUS_ORDER: defineAction('UPDATE_ORDER'),
    CREATE_ORDER: defineAction('CREATE_ORDER'),
    ADD_NEW_CART: defineAction('ADD_NEW_CART'),
    REMOVE_CART: defineAction('REMOVE_CART'),
    UPDATE_CART: defineAction('UPDATE_CART'),
}

export const actions = {
    getOrderList: createActionWithLoading(actionTypes.GET_ORDER_LIST),
    getOrderById: createAction(actionTypes.GET_ORDER_BY_ID),
    updateStatusOrder: createAction(actionTypes.UPDATE_STATUS_ORDER),
    createOrder: createAction(actionTypes.CREATE_ORDER),
    addNewCart: createAction(actionTypes.ADD_NEW_CART),
    removeCart: createAction(actionTypes.REMOVE_CART),
    updateCart: createAction(actionTypes.UPDATE_CART),
}