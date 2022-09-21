import { all } from 'redux-saga/effects';
import appCommon from './appCommon';
import account from './account';
import user from './user';
import groupPermission from './groupPermission';
import category from './category';
import news from './news';

const sagas = [
    ...appCommon,
    ...account,
    ...user,
    ...groupPermission,
    ...category,
    ...news,
];

function* rootSaga() {
    yield all(sagas);
}

export default rootSaga;
