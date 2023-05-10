import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('DASHBOARD');

const { defineAction, createActionWithLoading } = reduxUtil;

export const actionTypes = {
    GET_REV_TABLE_DATA: defineAction('GET_REV_TABLE_DATA'),
    GET_REV_VALUES_DATA: defineAction('GET_REV_VALUES_DATA'),
}

export const actions = {
    getRevenueTableData: createActionWithLoading(actionTypes.GET_REV_TABLE_DATA),
    getRevenueValuesData: createActionWithLoading(actionTypes.GET_REV_VALUES_DATA),
}