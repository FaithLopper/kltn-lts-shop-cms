import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('VARIANT_TEMPLATE');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_VARIANT_TEMPLATE_LIST: defineAction('GET_VARIANT_TEMPLATE_LIST'),
    CREATE_VARIANT_TEMPLATE: defineAction('CREATE_VARIANT_TEMPLATE'),
    GET_VARIANT_TEMPLATE_BY_ID: defineAction('GET_VARIANT_TEMPLATE_BY_ID'),
    UPDATE_VARIANT_TEMPLATE: defineAction('UPDATE_VARIANT_TEMPLATE'),
    DELETE_VARIANT_TEMPLATE: defineAction('DELETE_VARIANT_TEMPLATE'),
    GET_VARIANT_TEMPLATE_AUTOCOMPLETE: defineAction('GET_VARIANT_TEMPLATE_AUTOCOMPLETE'),
}

export const actions = {
    getVariantTemplateList: createActionWithLoading(actionTypes.GET_VARIANT_TEMPLATE_LIST),
    createVariantTemplate: createAction(actionTypes.CREATE_VARIANT_TEMPLATE),
    getVariantTemplateById: createAction(actionTypes.GET_VARIANT_TEMPLATE_BY_ID),
    updateVariantTemplate: createAction(actionTypes.UPDATE_VARIANT_TEMPLATE),
    deleteVariantTemplate: createActionWithLoading(actionTypes.DELETE_VARIANT_TEMPLATE),
    getVariantTemplateAutoComplete: createActionWithLoading(actionTypes.GET_VARIANT_TEMPLATE_AUTOCOMPLETE)
}