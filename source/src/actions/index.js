import { actions as appCommonActions, actionTypes as appCommonTypes } from './appCommon';
import { actions as accountActions, actionTypes as accountTypes } from './account';
import { actions as userActions, actionTypes as userTypes } from './user';
import { actions as groupPermissionActions, actionTypes as groupPermissionTypes } from './groupPermission';
import {actions as categoryActions, actionTypes as categoryTypes} from './category';
import {actions as newsActions, actionTypes as newsTypes} from './news';
import {actions as provinceActions, actionType as provinceTypes} from "./province"
import {actions as importExportActions, actionTypes as importExportTypes} from "./importExport"
import {actions as customerActions, actionTypes as customerTypes } from "./customer"
export const actions = {
    ...appCommonActions,
    ...accountActions,
    ...userActions,
    ...groupPermissionActions,
    ...categoryActions,
    ...newsActions,
    ...provinceActions,
    ...importExportActions,
    ...customerActions
}

export const types = {
    ...appCommonTypes,
    ...accountTypes,
    ...userTypes,
    ...groupPermissionTypes,
    ...categoryTypes,
    ...newsTypes,
    ...provinceTypes,
    ...importExportTypes,
    ...customerTypes
}