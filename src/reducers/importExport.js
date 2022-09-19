import {actionTypes, reduxUtil} from "../actions/importExport";


const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;

const {
    GET_IMPORT_EXPORT_LIST,
    GET_CATEGORY_AUTOCOMPLE_IMPORT_EXPORT,
    DELETE_IMPORT_EXPORT,
} = actionTypes;

const initialState = {
    importExportDataList: {},
    importExportLoading: false,
    categoryAutoCompleteImportExport: {},
}

const reducer = createReducer ({
    [defineActionLoading(GET_IMPORT_EXPORT_LIST)] : (state) =>{
        return {
            ...state,
            importExportLoading: true,
        }
    },
    [defineActionSuccess(GET_IMPORT_EXPORT_LIST)] : (state, {importExportDataList} ) =>{
        return {
            ...state,
            importExportDataList,
            importExportLoading: false,
        }
    },
    [defineActionSuccess(GET_CATEGORY_AUTOCOMPLE_IMPORT_EXPORT)] : (state, {categoryAutoCompleteImportExport} ) =>{
        return {
            ...state,
            categoryAutoCompleteImportExport,
        }
    },
    [defineActionLoading(DELETE_IMPORT_EXPORT)] : (state) =>{
        return {
            ...state,
            importExportLoading: true,
        }
    },
    [defineActionFailed(DELETE_IMPORT_EXPORT)] : (state) =>{
        return {
            ...state,
            importExportLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};