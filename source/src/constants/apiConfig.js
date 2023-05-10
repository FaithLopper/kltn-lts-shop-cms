const baseHeader = {
    'Content-Type': 'application/json',
    'Accept': '*/*'
}

const multipartFormHeader = {
    'Content-Type': 'multipart/form-data'
}


const apiConfig = {
    file: {
        upload: {
            path: '/v1/file/upload',
            method: 'POST',
            headers: multipartFormHeader
        }
    },
    account: {
        login: {
            path: '/v1/account/login',
            method: 'POST',
            master: true,
            headers: baseHeader,
        },
        logout: {
            path: '/v1/account/logout',
            method: 'GET',
            master: true,
            headers: baseHeader
        },
        getAdminProfile: {
            path: '/v1/account/profile',
            method: 'GET',
            master: true,
            headers: baseHeader
        },
        updateProfileAdmin: {
            path: '/v1/account/update_profile',
            method: 'PUT',
            master: true,
            headers: baseHeader
        }
    },
    user: {
        getAdminList: {
            path: '/v1/account/list',
            method: 'GET',
            master: true,
            headers: baseHeader
        },
        getAdminById: {
            path: '/v1/account/get',
            method: 'GET',
            master: true,
            headers: baseHeader
        },
        createAdmin: {
            path: '/v1/account/create_admin',
            method: 'POST',
            master: true,
            headers: baseHeader
        },
        updateAdmin: {
            path: '/v1/account/update_admin',
            method: 'PUT',
            master: true,
            headers: baseHeader
        },
        deleteAdmin: {
            path: '/v1/account/delete',
            method: 'DELETE',
            master: true,
            headers: baseHeader
        },
    },
    groupPermission: {
        getList: {
            path: '/v1/group/tenant/list',
            method: 'GET',
            master: true,
            headers: baseHeader
        },
        getPermissionList: {
            path: '/v1/permission/tenant/list',
            method: 'GET',
            master: true,
            headers: baseHeader
        },
        getById: {
            path: '/v1/group/tenant/get',
            method: 'GET',
            master: true,
            headers: baseHeader
        },
        create: {
            path: '/v1/group/tenant/create',
            method: 'POST',
            master: true,
            headers: baseHeader
        },
        update: {
            path: '/v1/group/tenant/update',
            method: 'PUT',
            master: true,
            headers: baseHeader
        },
        updateStatus: {
            path: '/v1/skills/status',
            method: 'PUT',
            master: true,
            headers: baseHeader
        },
        delete: {
            path: '/v1/group/tenant/delete',
            method: 'DELETE',
            master: true,
            headers: baseHeader
        },
        groupPermissionAutoComplete: {
            path: '/v1/group/tenant/list_combobox',
            method: 'GET',
            master: true,
            headers: baseHeader
        },
    },
    masterCategory: {
        getList: {
            path: '/v1/category/list',
            method: 'GET',
            master: true,
            headers: baseHeader
        },
        create: {
            path: '/v1/category/create',
            method: 'POST',
            master: true,
            headers: baseHeader
        },
        getById: {
            path: '/v1/category/get',
            method: 'GET',
            master: true,
            headers: baseHeader
        },
        update: {
            path: '/v1/category/update',
            method: 'PUT',
            master: true,
            headers: baseHeader
        },
        delete: {
            path: '/v1/category/delete',
            method: 'DELETE',
            master: true,
            headers: baseHeader
        },
        categoryAutoComplete: {
            path: '/v1/category/auto-complete',
            method: 'GET',
            master: true,
            headers: baseHeader
        },
    },
    tenantCategory: {
        getList: {
            path: '/v1/category/list',
            method: 'GET',
            headers: baseHeader
        },
        create: {
            path: '/v1/category/create',
            method: 'POST',
            headers: baseHeader
        },
        getById: {
            path: '/v1/category/get',
            method: 'GET',
            headers: baseHeader
        },
        update: {
            path: '/v1/category/update',
            method: 'PUT',
            headers: baseHeader
        },
        delete: {
            path: '/v1/category/delete',
            method: 'DELETE',
            headers: baseHeader
        },
        categoryAutoComplete: {
            path: '/v1/category/auto-complete',
            method: 'GET',
            headers: baseHeader
        },
    },
    news: {
        getList: {
            path:  '/v1/news/list',
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            path:  '/v1/news/create',
            method: 'POST',
            headers: baseHeader,
        },
        getById: {
            path:  '/v1/news/get',
            method: 'GET',
            headers: baseHeader,
        },
        update: {
            path:  '/v1/news/update',
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            path:  '/v1/news/delete',
            method: 'DELETE',
            headers: baseHeader,
        },
        categoryAutoComplete: {
            path: '/v1/category/auto-complete',
            method: 'GET',
            headers: baseHeader
        },
    },
    province: {
        getList:{
            path:"/v1/locations/list",
            method:"GET",
            headers:baseHeader
        },
        getById:{
            path:"/v1/locations/get",
            method:"GET",
            headers:baseHeader
        },
        create:{
            path:"/v1/locations/create",
            method:"POST",
            headers:baseHeader
        },
        update:{
            path:"/v1/locations/update",
            method:"PUT",
            headers:baseHeader
        },
        delete:{
            path:"/v1/locations/delete",
            method:"DELETE",
            headers:baseHeader
        },
        provinceAutoComplete:{
            path:"/v1/locations/auto-complete",
            method:"GET",
            headers:baseHeader
        }
    },
    customer: {
        getList: {
            path: '/v1/customer/list',
            method: 'GET',
            master: true,
            headers: baseHeader
        },
        getById: {
            path: '/v1/customer/get',
            method: 'GET',
            master: true,
            headers: baseHeader
        },
        create: {
            path: '/v1/customer/create',
            method: 'POST',
            master: true,
            headers: baseHeader
        },
        update: {
            path: '/v1/customer/update',
            method: 'PUT',
            master: true,
            headers: baseHeader
        },
        delete: {
            path: '/v1/customer/delete',
            method: 'DELETE',
            master: true,
            headers: baseHeader
        },
        customerAutoComplete:{
            path:"/v1/customer/auto-complete",
            method:"GET",
            master: true,
            headers:baseHeader
        },
      
    },
    addressCustomer: {
        getList: {
            path: '/v1/customer/address/list',
            method: 'GET',
            master: true,
            headers: baseHeader
        },
        getById: {
            path: '/v1/customer/address/get',
            method: 'GET',
            master: true,
            headers: baseHeader
        },
        create: {
            path: '/v1/customer/address/create',
            method: 'POST',
            master: true,
            headers: baseHeader
        },
        update: {
            path: '/v1/customer/address/update',
            method: 'PUT',
            master: true,
            headers: baseHeader
        },
        delete: {
            path: '/v1/customer/address/delete',
            method: 'DELETE',
            master: true,
            headers: baseHeader
        },
        setDefauldAddress:{
            path:"/v1/customer/address/default",
            method:"PUT",
            master: true,
            headers:baseHeader
        }
    },
    ranks: {
        getList:{
            path:"/v1/ranks/list",
            method:"GET",
            headers:baseHeader
        },
        getById:{
            path:"/v1/ranks/get",
            method:"GET",
            headers:baseHeader
        },
        create:{
            path:"/v1/ranks/create",
            method:"POST",
            headers:baseHeader
        },
        update:{
            path:"/v1/ranks/update",
            method:"PUT",
            headers:baseHeader
        },
        delete:{
            path:"/v1/ranks/delete",
            method:"DELETE",
            headers:baseHeader
        },
        ranksAutoComplete:{
            path:"/v1/ranks/auto-complete",
            method:"GET",
            headers:baseHeader
        }
      },
    employee: {
        getList:{
            path:"/v1/employee/list",
            method:"GET",
            master: true,
            headers:baseHeader
        },
        getById:{
            path:"/v1/employee/get",
            method:"GET",
            master: true,
            headers:baseHeader
        },
        create:{
            path:"/v1/employee/create",
            method:"POST",
            master: true,
            headers:baseHeader
        },
        update:{
            path:"/v1/employee/update",
            method:"PUT",
            master: true,
            headers:baseHeader
        },
        delete:{
            path:"/v1/employee/delete",
            method:"DELETE",
            master: true,
            headers:baseHeader
        },
        employeeAutoComplete:{
            path:"/v1/employee/auto-complete",
            method:"GET",
            master: true,
            headers:baseHeader
        },
        getEmployeeProfile: {
            path:  '/v1/employee/profile',
            method: 'GET',
            master: true,
            headers: baseHeader,
        },
        updateProfile: {
            path:  '/v1/employee/update-profile',
            method: 'PUT',
            master: true,
            headers: baseHeader,
        },
      },
      productCategory: {
        getList:{
            path:"/v1/product-category/list",
            method:"GET",
            headers:baseHeader
        },
        getById:{
            path:"/v1/product-category/get",
            method:"GET",
            headers:baseHeader
        },
        create:{
            path:"/v1/product-category/create",
            method:"POST",
            headers:baseHeader
        },
        update:{
            path:"/v1/product-category/update",
            method:"PUT",
            headers:baseHeader
        },
        delete:{
            path:"/v1/product-category/delete",
            method:"DELETE",
            headers:baseHeader
        },
        productCategoryAutoComplete: {
            path:"/v1/product-category/auto-complete",
            method:"GET",
            headers:baseHeader
        },
        productCategoryChangeOrder: {
            path:"/v1/product-category/change-order",
            method:"PUT",
            headers:baseHeader
        }
      },
      store: {
        getList: {
            path: '/v1/store/list',
            method: 'GET',
            headers: baseHeader
        },
        getById: {
            path: '/v1/store/get',
            method: 'GET',
            headers: baseHeader
        },
        create: {
            path: '/v1/store/create',
            method: 'POST',
            headers: baseHeader
        },
        update: {
            path: '/v1/store/update',
            method: 'PUT',
            headers: baseHeader
        },
        delete: {
            path: '/v1/store/delete',
            method: 'DELETE',
            headers: baseHeader
        },
        getStoreAutoCompleted:{
            path: '/v1/store/auto-complete',
            method: 'GET',
            headers: baseHeader
        }
    },
    variant: {
        getList: {
            path: '/v1/variant/list',
            method: 'GET',
            headers: baseHeader
        },
        getById: {
            path: '/v1/variant/get',
            method: 'GET',
            headers: baseHeader
        },
        create: {
            path: '/v1/variant/create',
            method: 'POST',
            headers: baseHeader
        },
        update: {
            path: '/v1/variant/update',
            method: 'PUT',
            headers: baseHeader
        },
        delete: {
            path: '/v1/variant/delete',
            method: 'DELETE',
            headers: baseHeader
        },
        getVariantAutoCompleted:{
            path: '/v1/variant/auto-complete',
            method: 'GET',
            headers: baseHeader
        }
    },
    variantTemplate: {
        getList: {
            path: '/v1/variant-template/list',
            method: 'GET',
            headers: baseHeader
        },
        getById: {
            path: '/v1/variant-template/get',
            method: 'GET',
            headers: baseHeader
        },
        create: {
            path: '/v1/variant-template/create',
            method: 'POST',
            headers: baseHeader
        },
        update: {
            path: '/v1/variant-template/update',
            method: 'PUT',
            headers: baseHeader
        },
        delete: {
            path: '/v1/variant-template/delete',
            method: 'DELETE',
            headers: baseHeader
        },
        getVariantTemplateAutoCompleted:{
            path: '/v1/variant-template/auto-complete',
            method: 'GET',
            headers: baseHeader
        }
    },
    product: {
        getList: {
            path: '/v1/product/list',
            method: 'GET',
            headers: baseHeader
        },
        getById: {
            path: '/v1/product/get',
            method: 'GET',
            headers: baseHeader
        },
        create: {
            path: '/v1/product/create',
            method: 'POST',
            headers: baseHeader
        },
        update: {
            path: '/v1/product/update',
            method: 'PUT',
            headers: baseHeader
        },
        delete: {
            path: '/v1/product/delete',
            method: 'DELETE',
            headers: baseHeader
        },
        getProductAutoCompleted:{
            path: '/v1/product/auto-complete',
            method: 'GET',
            headers: baseHeader
        }
    },
    tags: {
        getList: {
            path: '/v1/tag/list',
            method: 'GET',
            headers: baseHeader
        },
        create: {
            path: '/v1/tag/create',
            method: 'POST',
            headers: baseHeader
        },
        getById: {
            path: '/v1/tag/get',
            method: 'GET',
            headers: baseHeader
        },
        update: {
            path: '/v1/tag/update',
            method: 'PUT',
            headers: baseHeader
        },
        delete: {
            path: '/v1/tag/delete',
            method: 'DELETE',
            headers: baseHeader
        },
        tagsAutoComplete: {
            path: '/v1/tag/auto-complete',
            method: 'GET',
            headers: baseHeader
        },
    },
    order: {
        getList: {
            path: '/v1/order/list',
            method: 'GET',
            headers: baseHeader
        },
        create: {
        },
        getById: {
            path: '/v1/order/get',
            method: 'GET',
            headers: baseHeader
        },
        update: {
            path: '/v1/order/change-status',
            method: 'PUT',
            headers: baseHeader
        },
        delete: {
        },
        tagsAutoComplete: {
        },
        getHistory: {
            path: '/v1/order/get-history',
            method: 'GET',
            headers: baseHeader
        },
    },
    dashBoard: {
        businessPerformance: {
            path: '/v1/dashboard/business-performance',
            method: 'GET',
            headers: baseHeader
        },
        getChartData: {
            path: '/v1/dashboard/revenue-by-month',
            method: 'GET',
            headers: baseHeader
        }
    },
}
export default apiConfig;
