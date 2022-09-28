import { actions as appCommonActions, actionTypes as appCommonTypes } from './appCommon';
import { actions as accountActions, actionTypes as accountTypes } from './account';
import { actions as userActions, actionTypes as userTypes } from './user';
import { actions as groupPermissionActions, actionTypes as groupPermissionTypes } from './groupPermission';
import {actions as categoryActions, actionTypes as categoryTypes} from './category';
import {actions as newsActions, actionTypes as newsTypes} from './news';
import {actions as provinceActions, actionTypes as provinceTypes} from './province';
import {actions as ranksActions, actionTypes as ranksTypes} from './ranks';

export const actions = {
    ...appCommonActions,
    ...accountActions,
    ...userActions,
    ...groupPermissionActions,
    ...categoryActions,
    ...newsActions,
    ...provinceActions,
    ...ranksActions
}

export const types = {
    ...appCommonTypes,
    ...accountTypes,
    ...userTypes,
    ...groupPermissionTypes,
    ...categoryTypes,
    ...newsTypes,
    ...provinceTypes,
    ...ranksTypes
}