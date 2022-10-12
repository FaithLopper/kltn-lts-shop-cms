import { call, takeLatest, put } from "redux-saga/effects";

import { sendRequest } from "../services/apiService";
import { actionTypes, reduxUtil } from "../actions/account";
import { actions } from "../actions";
import apiConfig from "../constants/apiConfig";
import { UserTypes } from "../constants";
import { handleApiResponse } from '../utils/apiHelper';

const { LOGIN, LOGOUT, UPDATE_PROFILE, GET_PROFILE } = actionTypes;

const {
  defineActionLoading,
  defineActionSuccess,
  defineActionFailed,
} = reduxUtil;

function* login({ payload: { params, onCompleted, onError } }) {
  try {
    let cmsParams = {
      ...params,
      app: "APP_WEB_CMS"
    }
    
    const result = yield call(sendRequest, apiConfig.account.login, cmsParams);
    const { success, responseData } = result;
    
    if (success && responseData.result) {
      let apiParams;
      if(responseData.data?.kind === UserTypes.ADMIN) {
        apiParams = apiConfig.account.getAdminProfile;
      }
      else {
        apiParams = apiConfig.employee.getEmployeeProfile;
      }
      // const profileResult = yield call(
      //   sendRequest,
      //   apiParams,
      //   {},
      //   responseData.data.token
      // );
      const profileResult={
        "success": true,
        "responseData": {
            "result": true,
            "data": {
                "id": 33,
                "kind": 1,
                "username": "admin",
                "fullName": "admin2",
                "group": {
                    "id": 32,
                    "name": "ROLE SUPPER ADMIN",
                    "description": "Phân quyền dành cho admin\n",
                    "kind": 1,
                    "permissions": [
                        {
                            "id": 5,
                            "name": "Logout",
                            "action": "/v1/account/logout",
                            "showMenu": false,
                            "description": "Logout",
                            "nameGroup": "Account",
                            "status": 1
                        },
                        {
                            "id": 6,
                            "name": "Get profile",
                            "action": "/v1/account/profile",
                            "showMenu": false,
                            "description": "Get profile",
                            "nameGroup": "Account",
                            "status": 1
                        },
                        {
                            "id": 9,
                            "name": "Update profile user",
                            "action": "/v1/account/update_profile",
                            "showMenu": false,
                            "description": "Update profile user",
                            "nameGroup": "Account",
                            "status": 1
                        },
                        {
                            "id": 10,
                            "name": "Verify account",
                            "action": "/v1/account/verify_account",
                            "showMenu": false,
                            "description": "Verify account",
                            "nameGroup": "Account",
                            "status": 1
                        },
                        {
                            "id": 11,
                            "name": "Category auto complete",
                            "action": "/v1/category/auto-complete",
                            "showMenu": false,
                            "description": "Category auto complete",
                            "nameGroup": "Category",
                            "status": 1
                        },
                        {
                            "id": 13,
                            "name": "Delete category",
                            "action": "/v1/category/delete",
                            "showMenu": false,
                            "description": "Delete category",
                            "nameGroup": "Category",
                            "status": 1
                        },
                        {
                            "id": 14,
                            "name": "Get category",
                            "action": "/v1/category/get",
                            "showMenu": false,
                            "description": "Get category by id",
                            "nameGroup": "Category",
                            "status": 1
                        },
                        {
                            "id": 15,
                            "name": "Get list category",
                            "action": "/v1/category/list",
                            "showMenu": false,
                            "description": "Get list category",
                            "nameGroup": "Category",
                            "status": 1
                        },
                        {
                            "id": 16,
                            "name": "Update category",
                            "action": "/v1/category/update",
                            "showMenu": false,
                            "description": "Update category",
                            "nameGroup": "Category",
                            "status": 1
                        },
                        {
                            "id": 17,
                            "name": "Download file",
                            "action": "/v1/file/download",
                            "showMenu": false,
                            "description": "Download file",
                            "nameGroup": "File",
                            "status": 1
                        },
                        {
                            "id": 18,
                            "name": "Upload file",
                            "action": "/v1/file/upload",
                            "showMenu": false,
                            "description": "Upload file",
                            "nameGroup": "File",
                            "status": 1
                        },
                        {
                            "id": 19,
                            "name": "Create group",
                            "action": "/v1/group/create",
                            "showMenu": false,
                            "description": "Create group",
                            "nameGroup": "Group",
                            "status": 1
                        },
                        {
                            "id": 20,
                            "name": "Delete group",
                            "action": "/v1/group/delete",
                            "showMenu": false,
                            "description": "Delete group",
                            "nameGroup": "Group",
                            "status": 1
                        },
                        {
                            "id": 21,
                            "name": "Get group",
                            "action": "/v1/group/get",
                            "showMenu": false,
                            "description": "Get group by id",
                            "nameGroup": "Group",
                            "status": 1
                        },
                        {
                            "id": 22,
                            "name": "List group",
                            "action": "/v1/group/list",
                            "showMenu": false,
                            "description": "Get list group",
                            "nameGroup": "Group",
                            "status": 1
                        },
                        {
                            "id": 23,
                            "name": "List group combobox",
                            "action": "/v1/group/list_combobox",
                            "showMenu": false,
                            "description": "Get list group combobox",
                            "nameGroup": "Group",
                            "status": 1
                        },
                        {
                            "id": 24,
                            "name": "Update group",
                            "action": "/v1/group/update",
                            "showMenu": false,
                            "description": "Update group",
                            "nameGroup": "Group",
                            "status": 1
                        },
                        {
                            "id": 25,
                            "name": "Create news",
                            "action": "/v1/news/create",
                            "showMenu": false,
                            "description": "Create news",
                            "nameGroup": "News",
                            "status": 1
                        },
                        {
                            "id": 26,
                            "name": "Delete news",
                            "action": "/v1/news/delete",
                            "showMenu": false,
                            "description": "Delete news",
                            "nameGroup": "News",
                            "status": 1
                        },
                        {
                            "id": 27,
                            "name": "Get news by id",
                            "action": "/v1/news/get",
                            "showMenu": false,
                            "description": "Get news by id",
                            "nameGroup": "News",
                            "status": 1
                        },
                        {
                            "id": 28,
                            "name": "Get list news",
                            "action": "/v1/news/list",
                            "showMenu": false,
                            "description": "Get list news",
                            "nameGroup": "News",
                            "status": 1
                        },
                        {
                            "id": 29,
                            "name": "Update news",
                            "action": "/v1/news/update",
                            "showMenu": false,
                            "description": "Update news",
                            "nameGroup": "News",
                            "status": 1
                        },
                        {
                            "id": 30,
                            "name": "Create permission",
                            "action": "/v1/permission/create",
                            "showMenu": false,
                            "description": "Create permission",
                            "nameGroup": "Permission",
                            "status": 1
                        },
                        {
                            "id": 31,
                            "name": "List permission",
                            "action": "/v1/permission/list",
                            "showMenu": false,
                            "description": "List permission",
                            "nameGroup": "Permission",
                            "status": 1
                        },
                        {
                            "id": 72,
                            "name": "Chill list location",
                            "action": "/v1/locations/list",
                            "showMenu": false,
                            "description": "List location",
                            "nameGroup": "Locations",
                            "status": 1
                        },
                        {
                            "id": 73,
                            "name": "Get location",
                            "action": "/v1/locations/get",
                            "showMenu": false,
                            "description": "Get location",
                            "nameGroup": "Locations",
                            "status": 1
                        },
                        {
                            "id": 74,
                            "name": "Auto complete location",
                            "action": "/v1/locations/auto-complete",
                            "showMenu": false,
                            "description": "Auto complete location",
                            "nameGroup": "Locations",
                            "status": 1
                        },
                        {
                            "id": 75,
                            "name": "Create location",
                            "action": "/v1/locations/create",
                            "showMenu": false,
                            "description": "Create location",
                            "nameGroup": "Locations",
                            "status": 1
                        },
                        {
                            "id": 84,
                            "name": "Get list rank",
                            "action": "/v1/ranks/list",
                            "showMenu": false,
                            "description": "Get list rank",
                            "nameGroup": "Ranks",
                            "status": 1
                        },
                        {
                            "id": 85,
                            "name": "Auto complete rank",
                            "action": "/v1/ranks/auto-complete",
                            "showMenu": false,
                            "description": "Auto complete rank",
                            "nameGroup": "Ranks",
                            "status": 1
                        },
                        {
                            "id": 86,
                            "name": "Get rank",
                            "action": "/v1/ranks/get",
                            "showMenu": false,
                            "description": "Get rank",
                            "nameGroup": "Ranks",
                            "status": 1
                        },
                        {
                            "id": 89,
                            "name": "Delete rank",
                            "action": "/v1/ranks/delete",
                            "showMenu": false,
                            "description": "Delete rank",
                            "nameGroup": "Ranks",
                            "status": 1
                        },
                        {
                            "id": 137,
                            "name": "ist customer",
                            "action": "/v1/customer/list",
                            "showMenu": false,
                            "description": "ist customer",
                            "nameGroup": "Customer",
                            "status": 1
                        },
                        {
                            "id": 138,
                            "name": "Auto complete customer",
                            "action": "/v1/customer/auto-complete",
                            "showMenu": false,
                            "description": "Auto complete customer",
                            "nameGroup": "Customer",
                            "status": 1
                        },
                        {
                            "id": 139,
                            "name": "Get customer",
                            "action": "/v1/customer/get",
                            "showMenu": false,
                            "description": "Get customer",
                            "nameGroup": "Customer",
                            "status": 1
                        },
                        {
                            "id": 140,
                            "name": "Profile customer",
                            "action": "/v1/customer/profile",
                            "showMenu": false,
                            "description": "Profile customer",
                            "nameGroup": "Customer",
                            "status": 1
                        },
                        {
                            "id": 149,
                            "name": "Delete customer's addresses",
                            "action": "/v1/customer/address/delete",
                            "showMenu": false,
                            "description": "Delete customer's addresses",
                            "nameGroup": "Customer",
                            "status": 1
                        },
                        {
                            "id": 150,
                            "name": "Set customer's addresses",
                            "action": "/v1/customer/address/default",
                            "showMenu": false,
                            "description": "Set customer's addresses",
                            "nameGroup": "Customer",
                            "status": 1
                        },
                        {
                            "id": 88,
                            "name": "Update rank",
                            "action": "/v1/ranks/update",
                            "showMenu": false,
                            "description": "Update rank",
                            "nameGroup": "Ranks",
                            "status": 1
                        },
                        {
                            "id": 87,
                            "name": "Create rank",
                            "action": "/v1/ranks/create",
                            "showMenu": false,
                            "description": "Create rank",
                            "nameGroup": "Ranks",
                            "status": 1
                        },
                        {
                            "id": 12,
                            "name": "Create category",
                            "action": "/v1/category/create",
                            "showMenu": false,
                            "description": "Create category",
                            "nameGroup": "Category",
                            "status": 1
                        },
                        {
                            "id": 167,
                            "name": "Auto complete employee",
                            "action": "/v1/employee/auto-complete",
                            "showMenu": false,
                            "description": "Auto complete employee",
                            "nameGroup": "Employee",
                            "status": 1
                        },
                        {
                            "id": 169,
                            "name": "Profile employee",
                            "action": "/v1/employee/profile",
                            "showMenu": false,
                            "description": "Profile employee",
                            "nameGroup": "Employee",
                            "status": 1
                        },
                        {
                            "id": 172,
                            "name": "Update employee profile",
                            "action": "/v1/employee/update-profile",
                            "showMenu": false,
                            "description": "Update employee profile",
                            "nameGroup": "Employee",
                            "status": 1
                        },
                        {
                            "id": 4,
                            "name": "List account",
                            "action": "/v1/account/list",
                            "showMenu": false,
                            "description": "List account",
                            "nameGroup": "Account",
                            "status": 1
                        },
                        {
                            "id": 7,
                            "name": "Request forget password",
                            "action": "/v1/account/request_forget_password",
                            "showMenu": false,
                            "description": "Request forget password",
                            "nameGroup": "Account",
                            "status": 1
                        },
                        {
                            "id": 166,
                            "name": "List employee",
                            "action": "/v1/employee/list",
                            "showMenu": false,
                            "description": "List employee",
                            "nameGroup": "Employee",
                            "status": 1
                        },
                        {
                            "id": 168,
                            "name": "Get employee",
                            "action": "/v1/employee/get",
                            "showMenu": false,
                            "description": "Get employee",
                            "nameGroup": "Employee",
                            "status": 1
                        },
                        {
                            "id": 170,
                            "name": "Create employee",
                            "action": "/v1/employee/create",
                            "showMenu": false,
                            "description": "Create employee",
                            "nameGroup": "Employee",
                            "status": 1
                        },
                        {
                            "id": 173,
                            "name": "Delete employee",
                            "action": "/v1/employee/delete",
                            "showMenu": false,
                            "description": "Delete employee",
                            "nameGroup": "Employee",
                            "status": 1
                        },
                        {
                            "id": 171,
                            "name": "Update employee",
                            "action": "/v1/employee/update",
                            "showMenu": false,
                            "description": "Update employee",
                            "nameGroup": "Employee",
                            "status": 1
                        },
                        {
                            "id": 148,
                            "name": "Update customer's addresses",
                            "action": "/v1/customer/address/update",
                            "showMenu": false,
                            "description": "Update customer's addresses",
                            "nameGroup": "Customer",
                            "status": 1
                        },
                        {
                            "id": 145,
                            "name": "List customer's addresses",
                            "action": "/v1/customer/address/list",
                            "showMenu": false,
                            "description": "List customer's addresses",
                            "nameGroup": "Customer",
                            "status": 1
                        },
                        {
                            "id": 146,
                            "name": "Get customer's addresses",
                            "action": "/v1/customer/address/get",
                            "showMenu": false,
                            "description": "Get customer's addresses",
                            "nameGroup": "Customer",
                            "status": 1
                        },
                        {
                            "id": 198,
                            "name": "Get list store",
                            "action": "/v1/store/list",
                            "showMenu": false,
                            "description": "Get list store",
                            "nameGroup": "Store",
                            "status": 1
                        },
                        {
                            "id": 201,
                            "name": "Create store",
                            "action": "/v1/store/create",
                            "showMenu": false,
                            "description": "Create store",
                            "nameGroup": "Store",
                            "status": 1
                        },
                        {
                            "id": 199,
                            "name": "Auto complete store",
                            "action": "/v1/store/auto-complete",
                            "showMenu": false,
                            "description": "Auto complete store",
                            "nameGroup": "Store",
                            "status": 1
                        },
                        {
                            "id": 202,
                            "name": "Update store",
                            "action": "/v1/store/update",
                            "showMenu": false,
                            "description": "Update store",
                            "nameGroup": "Store",
                            "status": 1
                        },
                        {
                            "id": 200,
                            "name": "Get store",
                            "action": "/v1/store/get",
                            "showMenu": false,
                            "description": "Get store",
                            "nameGroup": "Store",
                            "status": 1
                        },
                        {
                            "id": 203,
                            "name": "Delete store",
                            "action": "/v1/store/delete",
                            "showMenu": false,
                            "description": "Delete store",
                            "nameGroup": "Store",
                            "status": 1
                        },
                        {
                            "id": 204,
                            "name": "Get list product category",
                            "action": "/v1/product-category/list",
                            "showMenu": false,
                            "description": "Get list product category",
                            "nameGroup": "Product category",
                            "status": 1
                        },
                        {
                            "id": 207,
                            "name": "Delete product category",
                            "action": "/v1/product-category/delete",
                            "showMenu": false,
                            "description": "Delete product category",
                            "nameGroup": "Product category",
                            "status": 1
                        },
                        {
                            "id": 208,
                            "name": "Auto complete product category",
                            "action": "/v1/product-category/auto-complete",
                            "showMenu": false,
                            "description": "Auto complete product category",
                            "nameGroup": "Product category",
                            "status": 1
                        },
                        {
                            "id": 205,
                            "name": "Get product category",
                            "action": "/v1/product-category/get",
                            "showMenu": false,
                            "description": "Get product category",
                            "nameGroup": "Product category",
                            "status": 1
                        },
                        {
                            "id": 206,
                            "name": "Update product category",
                            "action": "/v1/product-category/update",
                            "showMenu": false,
                            "description": "Update product category",
                            "nameGroup": "Product category",
                            "status": 1
                        },
                        {
                            "id": 209,
                            "name": "Create product category",
                            "action": "/v1/product-category/create",
                            "showMenu": false,
                            "description": "Create product category",
                            "nameGroup": "Product category",
                            "status": 1
                        },
                        {
                            "id": 1,
                            "name": "Create admin",
                            "action": "/v1/account/create_admin",
                            "showMenu": false,
                            "description": "Create admin",
                            "nameGroup": "Account",
                            "status": 1
                        },
                        {
                            "id": 3,
                            "name": "Get account",
                            "action": "/v1/account/get",
                            "showMenu": false,
                            "description": "Get account",
                            "nameGroup": "Account",
                            "status": 1
                        },
                        {
                            "id": 8,
                            "name": "Update admin",
                            "action": "/v1/account/update_admin",
                            "showMenu": false,
                            "description": "Update admin",
                            "nameGroup": "Account",
                            "status": 1
                        },
                        {
                            "id": 217,
                            "name": "Get list variant template",
                            "action": "/v1/variant-template/list",
                            "showMenu": false,
                            "description": "Get list variant template",
                            "nameGroup": "Variant template",
                            "status": 1
                        },
                        {
                            "id": 220,
                            "name": "Create variant template",
                            "action": "/v1/variant-template/create",
                            "showMenu": false,
                            "description": "Create variant template",
                            "nameGroup": "Variant template",
                            "status": 1
                        },
                        {
                            "id": 218,
                            "name": "Auto complete variant template",
                            "action": "/v1/variant-template/auto-complete",
                            "showMenu": false,
                            "description": "Auto complete variant template",
                            "nameGroup": "Variant template",
                            "status": 1
                        },
                        {
                            "id": 221,
                            "name": "Update variant template",
                            "action": "/v1/variant-template/update",
                            "showMenu": false,
                            "description": "Update variant template",
                            "nameGroup": "Variant template",
                            "status": 1
                        },
                        {
                            "id": 219,
                            "name": "Get variant template",
                            "action": "/v1/variant-template/get",
                            "showMenu": false,
                            "description": "Get variant template",
                            "nameGroup": "Variant template",
                            "status": 1
                        },
                        {
                            "id": 222,
                            "name": "Delete variant template",
                            "action": "/v1/variant-template/delete",
                            "showMenu": false,
                            "description": "Delete variant template",
                            "nameGroup": "Variant template",
                            "status": 1
                        },
                        {
                            "id": 225,
                            "name": "Get variant",
                            "action": "/v1/variant/get",
                            "showMenu": false,
                            "description": "Get variant",
                            "nameGroup": "Variant",
                            "status": 1
                        },
                        {
                            "id": 228,
                            "name": "Delete variant",
                            "action": "/v1/variant/delete",
                            "showMenu": false,
                            "description": "Delete variant",
                            "nameGroup": "Variant",
                            "status": 1
                        },
                        {
                            "id": 224,
                            "name": "Auto complete variant",
                            "action": "/v1/variant/auto-complete",
                            "showMenu": false,
                            "description": "Auto complete variant",
                            "nameGroup": "Variant",
                            "status": 1
                        },
                        {
                            "id": 227,
                            "name": "Update variant",
                            "action": "/v1/variant/update",
                            "showMenu": false,
                            "description": "Update variant",
                            "nameGroup": "Variant",
                            "status": 1
                        },
                        {
                            "id": 226,
                            "name": "Create variant",
                            "action": "/v1/variant/create",
                            "showMenu": false,
                            "description": "Create variant",
                            "nameGroup": "Variant",
                            "status": 1
                        },
                        {
                            "id": 223,
                            "name": "Get list variant",
                            "action": "/v1/variant/list",
                            "showMenu": false,
                            "description": "Get list variant",
                            "nameGroup": "Variant",
                            "status": 1
                        },
                        {
                            "id": 143,
                            "name": "Update customer profile",
                            "action": "/v1/customer/update-profile",
                            "showMenu": false,
                            "description": "Update customer profile",
                            "nameGroup": "Customer",
                            "status": 1
                        },
                        {
                            "id": 144,
                            "name": "Delete customer",
                            "action": "/v1/customer/delete",
                            "showMenu": false,
                            "description": "Delete customer",
                            "nameGroup": "Customer",
                            "status": 1
                        },
                        {
                            "id": 142,
                            "name": "Update customer",
                            "action": "/v1/customer/update",
                            "showMenu": false,
                            "description": "Update customer",
                            "nameGroup": "Customer",
                            "status": 1
                        },
                        {
                            "id": 76,
                            "name": "Update location",
                            "action": "/v1/locations/update",
                            "showMenu": false,
                            "description": "Update location",
                            "nameGroup": "Locations",
                            "status": 1
                        },
                        {
                            "id": 77,
                            "name": "Delete location",
                            "action": "/v1/locations/delete",
                            "showMenu": false,
                            "description": "Delete location",
                            "nameGroup": "Locations",
                            "status": 1
                        },
                        {
                            "id": 141,
                            "name": "Create customer",
                            "action": "/v1/customer/create",
                            "showMenu": false,
                            "description": "Create customer",
                            "nameGroup": "Customer",
                            "status": 1
                        },
                        {
                            "id": 147,
                            "name": "Create customer's addresses",
                            "action": "/v1/customer/address/create",
                            "showMenu": false,
                            "description": "Create customer's addresses",
                            "nameGroup": "Customer",
                            "status": 1
                        },
                        {
                          "id": 600,
                          "name": "Get product",
                          "action": "/v1/product/get",
                          "showMenu": false,
                          "description": "Get product",
                          "nameGroup": "product",
                          "status": 1
                      },
                      {
                          "id": 601,
                          "name": "Delete product",
                          "action": "/v1/product/delete",
                          "showMenu": false,
                          "description": "Delete product",
                          "nameGroup": "product",
                          "status": 1
                      },
                      {
                          "id": 602,
                          "name": "Auto complete product",
                          "action": "/v1/product/auto-complete",
                          "showMenu": false,
                          "description": "Auto complete product",
                          "nameGroup": "product",
                          "status": 1
                      },
                      {
                          "id": 603,
                          "name": "Update product",
                          "action": "/v1/product/update",
                          "showMenu": false,
                          "description": "Update product",
                          "nameGroup": "product",
                          "status": 1
                      },
                      {
                          "id": 604,
                          "name": "Create product",
                          "action": "/v1/product/create",
                          "showMenu": false,
                          "description": "Create product",
                          "nameGroup": "product",
                          "status": 1
                      },
                      {
                          "id": 605,
                          "name": "Get list product",
                          "action": "/v1/product/list",
                          "showMenu": false,
                          "description": "Get list product",
                          "nameGroup": "product",
                          "status": 1
                      },
                    ]
                },
                "lastLogin": "12/10/2022 08:26:22",
                "phone": "09462201272",
                "isSuperAdmin": true
            },
            "message": "Get Account success"
        }
    }
    console.log(profileResult);
      if (profileResult.success && profileResult.responseData.result) {
        let permissions = [];
        if (
          profileResult.responseData.data.group &&
          profileResult.responseData.data.group.permissions
        ) {
          permissions = profileResult.responseData.data.group.permissions.map(
            (permission) => permission.action
          );
        }
        else if(profileResult.responseData.data.account.group &&
          profileResult.responseData.data.account.group.permissions){
         permissions = profileResult.responseData.data.account.group.permissions.map(
           (permission) => permission.action
         );
       }
        // const groupedSettings = settingsData.map(e=>e.value)
        onCompleted({
          token: responseData.data.token,
          id: profileResult.responseData.data.id,
          avatar: profileResult.responseData.data.avatar ? profileResult.responseData.data.avatar : profileResult.responseData.data.account?.avatar ? profileResult.responseData.data.account?.avatar : null,
          logo: profileResult.responseData.data.logoPath,
          username: profileResult.responseData.data.username ? profileResult.responseData.data.username : profileResult.responseData.data.account.username,
          fullName: profileResult.responseData.data.fullName ? profileResult.responseData.data.fullName : profileResult.responseData.data.account.fullName,
          kind: profileResult.responseData.data.kind ? profileResult.responseData.data.kind : profileResult.responseData.data.account.kind,
          isSuperAdmin: profileResult.responseData.data.isSuperAdmin ? profileResult.responseData.data.isSuperAdmin : profileResult.responseData.data.account?.isSuperAdmin,
          permissions,
        });
      } else {
        onError(responseData);
      }
    } else {
      onError(responseData);
    }
  } catch (error) {
    onError(error);
  }
}

function* logout() {
  try {
    yield call(sendRequest, apiConfig.account.logout);
  } catch (error) {
    // onError(error);
  }
}

function* getProfile({ payload }) {
  try {
    let result;
    if(actions.getUserData()?.kind === UserTypes.ADMIN) {
      result = yield call(sendRequest, apiConfig.account.getAdminProfile);
    }
    else {
      result = yield call(sendRequest, apiConfig.employee.getEmployeeProfile);
    }
    yield put({
      type: defineActionSuccess(GET_PROFILE),
      data: result.responseData && result.responseData.data,
    });
    yield put(actions.hideFullScreenLoading());
  } catch (error) {
    yield put({ type: defineActionFailed(GET_PROFILE) });
  }
}

function* updateProfile({ payload: { params, onCompleted, onError } }) {
  try {
    let userData;
    if(actions.getUserData()?.kind === UserTypes.ADMIN) {
      userData = yield call(sendRequest, apiConfig.account.updateProfileAdmin, params);
      yield call(sendRequest, apiConfig.account.getAdminProfile)
    }
    else {
      userData = yield call(sendRequest, apiConfig.employee.updateProfile, params);
    }
    handleApiResponse(userData, onCompleted, onError);
  } catch (error) {
    onError();
  }
}

const sagas = [
  takeLatest(defineActionLoading(LOGIN), login),
  takeLatest(LOGOUT, logout),
  takeLatest(GET_PROFILE, getProfile),
  takeLatest(defineActionLoading(UPDATE_PROFILE), updateProfile),
];

export default sagas;
