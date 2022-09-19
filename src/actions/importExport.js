import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('IMPORT-EXPORT');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_IMPORT_EXPORT_LIST: defineAction('GET_IMPORT_EXPORT_LIST'),
    CREATE_IMPORT_EXPORT: defineAction('CREATE_IMPORT_EXPORT'),
    GET_IMPORT_EXPORT_BY_ID: defineAction('GET_IMPORT_EXPORT_BY_ID'),
    UPDATE_IMPORT_EXPORT: defineAction('UPDATE_IMPORT_EXPORT'),
    DELETE_IMPORT_EXPORT: defineAction('DELETE_IMPORT_EXPORT'),
    GET_CATEGORY_AUTOCOMPLE_IMPORT_EXPORT: defineAction('GET_CATEGORY_AUTOCOMPLE_IMPORT_EXPORT'),
}

export const actions = {
    getImportExportList: createActionWithLoading(actionTypes.GET_IMPORT_EXPORT_LIST),
    createImportExport: createAction(actionTypes.CREATE_IMPORT_EXPORT),
    getImportExportById: createAction(actionTypes.GET_IMPORT_EXPORT_BY_ID),
    updateImportExport: createAction(actionTypes.UPDATE_IMPORT_EXPORT),
    deleteImportExport: createActionWithLoading(actionTypes.DELETE_IMPORT_EXPORT),
    getCategoryAutoCompleImportExport:createActionWithLoading(actionTypes.GET_CATEGORY_AUTOCOMPLE_IMPORT_EXPORT)
}