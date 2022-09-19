import { combineReducers } from 'redux';
import appCommon from './appCommon';
import account from './account';
import user from './user';
import groupPermission from './groupPermission';
import category from './category';
import news from './news';
import province from './province';
import importExport from './importExport';
import customer from './customer';
const rootReducer = combineReducers({
    appCommon: appCommon.reducer,
    account: account.reducer,
    user: user.reducer,
    groupPermission: groupPermission.reducer,
    category: category.reducer,
    province:province.reducer,
    news: news.reducer,
    importExports:importExport.reducer,
    customer:customer.reducer
});

export default rootReducer;