const baseHeader = {
  "Content-Type": "application/json",
  Accept: "*/*",
};

const multipartFormHeader = {
  "Content-Type": "multipart/form-data",
};

const apiConfig = {
  file: {
    upload: {
      path: "/v1/file/upload",
      method: "POST",
      headers: multipartFormHeader,
    },
  },
  account: {
    login: {
      path: "/v1/account/login",
      method: "POST",
      headers: baseHeader,
    },
    logout: {
      path: "/v1/account/logout",
      method: "GET",
      headers: baseHeader,
    },
    getAdminProfile: {
      path: "/v1/account/profile",
      method: "GET",
      headers: baseHeader,
    },
    updateProfileAdmin: {
      path: "/v1/account/update_profile",
      method: "PUT",
      headers: baseHeader,
    },
  },
  user: {
    getAdminList: {
      path: "/v1/account/list",
      method: "GET",
      headers: baseHeader,
    },
    getAdminById: {
      path: "/v1/account/get",
      method: "GET",
      headers: baseHeader,
    },
    createAdmin: {
      path: "/v1/account/create_admin",
      method: "POST",
      headers: baseHeader,
    },
    updateAdmin: {
      path: "/v1/account/update_admin",
      method: "PUT",
      headers: baseHeader,
    },
    deleteAdmin: {
      path: "/v1/account/delete",
      method: "DELETE",
      headers: baseHeader,
    },
  },
  groupPermission: {
    getList: {
      path: "/v1/group/list",
      method: "GET",
      headers: baseHeader,
    },
    getPermissionList: {
      path: "/v1/permission/list",
      method: "GET",
      headers: baseHeader,
    },
    getById: {
      path: "/v1/group/get",
      method: "GET",
      headers: baseHeader,
    },
    create: {
      path: "/v1/group/create",
      method: "POST",
      headers: baseHeader,
    },
    update: {
      path: "/v1/group/update",
      method: "PUT",
      headers: baseHeader,
    },
    updateStatus: {
      path: "/v1/skills/status",
      method: "PUT",
      headers: baseHeader,
    },
    delete: {
      path: "/v1/skills",
      method: "DELETE",
      headers: baseHeader,
    },
  },customer: {
    getList: {
      path: "/v1/customer/list",
      method: "GET",
      headers: baseHeader,
    },
    create: {
      path: "/v1/customer/create",
      method: "POST",
      headers: baseHeader,
    },
    getById: {
      path: "/v1/customer/get",
      method: "GET",
      headers: baseHeader,
    },
    update: {
      path: "/v1/customer/update",
      method: "PUT",
      headers: baseHeader,
    },
    delete: {
      path: "/v1/customer/delete",
      method: "DELETE",
      headers: baseHeader,
    },
    register:{
      path: "/v1/customer/register",
      method: "POST",
      headers: baseHeader,
    },
    updateProfileCustomer:{
      path: "/v1/customer/update_profile",
      method: "PUT",
      headers: baseHeader,
    },
    getProfileCustomer:{
      path: "/v1/customer/profile",
      method: "GET",
      headers: baseHeader,
    },
    getCustomerAutoComplete:{
      path: "/v1/customer/auto-complete",
      method: "GET",
      headers: baseHeader,
    },
  },
  category: {
    getList: {
      path: "/v1/category/list",
      method: "GET",
      headers: baseHeader,
    },
    create: {
      path: "/v1/category/create",
      method: "POST",
      headers: baseHeader,
    },
    getById: {
      path: "/v1/category/get",
      method: "GET",
      headers: baseHeader,
    },
    update: {
      path: "/v1/category/update",
      method: "PUT",
      headers: baseHeader,
    },
    delete: {
      path: "/v1/category/delete",
      method: "DELETE",
      headers: baseHeader,
    },
  },
  importExport: {
    getList: {
      path: "/v1/import-export/list",
      method: "GET",
      headers: baseHeader,
    },
    create: {
      path: "/v1/import-export/create",
      method: "POST",
      headers: baseHeader,
    },
    getById: {
      path: "/v1/import-export/get",
      method: "GET",
      headers: baseHeader,
    },
    update: {
      path: "/v1/import-export/update",
      method: "PUT",
      headers: baseHeader,
    },
    delete: {
      path: "/v1/import-export/delete",
      method: "DELETE",
      headers: baseHeader,
    },
    categoryAutoComplete: {
      path: "/v1/category/auto-complete",
      method: "GET",
      headers: baseHeader,
    },
  },
  province: {
    getList:{
        path:"/v1/province/list",
        method:"GET",
        headers:baseHeader
    },
    getById:{
        path:"/v1/province/get",
        method:"GET",
        headers:baseHeader
    },
    create:{
        path:"/v1/province/create",
        method:"POST",
        headers:baseHeader
    },
    update:{
        path:"/v1/province/update",
        method:"PUT",
        headers:baseHeader
    },
    delete:{
        path:"/v1/province/delete",
        method:"DELETE",
        headers:baseHeader
    },
    provinceAutoComplete:{
        path:"/v1/province/auto-complete",
        method:"GET",
        headers:baseHeader
    }
  },
  news: {
    getList: {
      path: "/v1/news/list",
      method: "GET",
      headers: baseHeader,
    },
    create: {
      path: "/v1/news/create",
      method: "POST",
      headers: baseHeader,
    },
    getById: {
      path: "/v1/news/get",
      method: "GET",
      headers: baseHeader,
    },
    update: {
      path: "/v1/news/update",
      method: "PUT",
      headers: baseHeader,
    },
    delete: {
      path: "/v1/news/delete",
      method: "DELETE",
      headers: baseHeader,
    },
    categoryAutoComplete: {
      path: "/v1/category/auto-complete",
      method: "GET",
      headers: baseHeader,
    },
  },
};
export default apiConfig;
