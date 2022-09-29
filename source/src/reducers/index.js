import { combineReducers } from 'redux';
import appCommon from './appCommon';
import account from './account';
import user from './user';
import groupPermission from './groupPermission';
import category from './category';
import news from './news';
import province from './province';
import customer from './customer';
import address from './address';
const rootReducer = combineReducers({
    appCommon: appCommon.reducer,
    account: account.reducer,
    user: user.reducer,
    groupPermission: groupPermission.reducer,
    category: category.reducer,
    news: news.reducer,
    province:province.reducer,
    customer:customer.reducer,
    address:address.reducer,
});

export default rootReducer;