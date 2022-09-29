import { all } from 'redux-saga/effects';
import appCommon from './appCommon';
import account from './account';
import user from './user';
import groupPermission from './groupPermission';
import category from './category';
import news from './news';
import provinces from './province'
import ranks from './ranks';
const sagas = [
    ...appCommon,
    ...account,
    ...user,
    ...groupPermission,
    ...category,
    ...news,
    ...provinces,
    ...ranks
];

function* rootSaga() {
    yield all(sagas);
}

export default rootSaga;
