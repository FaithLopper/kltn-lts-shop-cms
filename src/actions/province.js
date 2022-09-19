import reduxHelper from "../utils/redux";
export const reduxUtil = reduxHelper("PROVINCE");

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionType = {
  GET_PROVINCE_LIST: defineAction("GET_PROVINCE_LIST"),
  GET_PROVINCE_BY_ID: defineAction("GET_PROVINCE_BY_ID"),
  CREATE_PROVINCE: defineAction("CREATE_PROVINCE"),
  UPDATE_PROVINCE: defineAction("UPDATE_PROVINCE"),
  DELETE_PROVINCE: defineAction("DELETE_PROVINCE"),
  GET_PROVINCE_AUTOCOMPLETE: defineAction("GET_PROVINCE_AUTOCOMPLETE"),
};
export const actions = {
  getProvinceList: createActionWithLoading(actionType.GET_PROVINCE_LIST),
  getProvinceById: createAction(actionType.GET_PROVINCE_BY_ID),
  createProvince: createAction(actionType.CREATE_PROVINCE),
  updateProvince: createAction(actionType.UPDATE_PROVINCE),
  deleteProvince: createActionWithLoading(actionType.DELETE_PROVINCE),
  getProvinceAutocomple: createAction(actionType.GET_PROVINCE_AUTOCOMPLETE),
};
