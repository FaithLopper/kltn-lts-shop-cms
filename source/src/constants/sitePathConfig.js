import apiConfig from "./apiConfig";
import LoginPage from "../containers/account/LoginPage";
import ProfilePage from "../containers/account/ProfilePage";
// import DashBoard from '../containers/Dashboard';
import UserAdminListPage from "../containers/users/UserAdminListPage";
import GroupPermissionListPage from "../containers/groupPermission/GroupPermissionListPage";
import NewsListPage from "../containers/adminNews/NewsListPage";
import UserAminUpdate from "../containers/users/UserAminUpdate";
import ProvinceListPage from "../containers/province/ProvinceListPage";
import DistrictListPage from "../containers/province/DistrictListPage";
import CommuneListPage from "../containers/province/CommuneListPage";
import CategoryNewsListPage from "../containers/category/CategoryNewsListPage";
import CategoryNewsUpdate from "../containers/category/CategoryNewsUpdate";
import CategoryJobsListPage from "../containers/category/CategoryJobsListPage";
import CategoryJobsUpdate from "../containers/category/CategoryJobsUpdate";
import CategoryDepartmentsListPage from "../containers/category/CategoryDepartmentsListPage";
import CategoryDepartmentsUpdate from "../containers/category/CategoryDepartmentsUpdate";
import CustomerListPage from "../containers/customer/CustomerListPage";
import CustomerUpdatePage from "../containers/customer/CustomerUpdatePage";
import AddressListPage from "../containers/customer/AddressListPage";
import AddressUpdatePage from "../containers/customer/AddressUpdatePage";
import RanksListPage from "../containers/ranks/RanksListPage";
import RanksUpdate from "../containers/ranks/RanksUpdate";
import NewsUpdate from "../containers/adminNews/NewsUpdate";
import EmployeeListPage from "../containers/employee/EmployeeListPage";
import EmployeeUpdate from "../containers/employee/EmployeeUpdate";

export const sitePathConfig = {
    login: {
        path: '/login',
        component:LoginPage,
    },
    profile: {
        path: '/profile',
        component:ProfilePage
    },
    admin: {
        path: '/admins',
        component:UserAdminListPage,
        childrenKeys: ['/admins/create','/admins/:id'],  //nếu có trang Update thì để childPath dạng ['/parent/create','/parent/update']
        permissions: [
            apiConfig.user.getAdminList.path,
            apiConfig.user.getAdminById.path,
            apiConfig.user.createAdmin.path,
            apiConfig.user.updateAdmin.path,
            apiConfig.user.deleteAdmin.path
        ],
    },
    adminUpdate: {
        path: '/admins/:id',
        component:UserAminUpdate,
        permissions: [
            apiConfig.user.createAdmin.path,
            apiConfig.user.updateAdmin.path,
        ]
    },
    forbidden: {
        path: '/forbidden'
    },
    groupPermission: {
        path: '/group-permission',
        component:GroupPermissionListPage,
        permissions: [
            apiConfig.groupPermission.getList.path,
            apiConfig.groupPermission.getById.path,
            apiConfig.groupPermission.create.path,
            apiConfig.groupPermission.update.path,
            'not_have_delete',
            apiConfig.groupPermission.getPermissionList.path,
        ]
    },
    categoryNews: {
        path: '/category-news',
        childrenKeys:['/category-news/:id','/category-news/create'],
        component:CategoryNewsListPage,
        permissions: [
            apiConfig.category.getList.path,
            apiConfig.category.getById.path,
            apiConfig.category.create.path,
            apiConfig.category.update.path,
            apiConfig.category.delete.path,
        ]
    },
    categoryNewsUpdate: {
        path: '/category-news/:id',
        component:CategoryNewsUpdate,
        permissions: [
            apiConfig.category.create.path,
            apiConfig.category.update.path,
        ]
    },
    categoryJobs: {
        path: '/category-jobs',
        childrenKeys:['/category-jobs/:id','/category-jobs/create'],
        component:CategoryJobsListPage,
        permissions: [
            apiConfig.category.getList.path,
            apiConfig.category.getById.path,
            apiConfig.category.create.path,
            apiConfig.category.update.path,
            apiConfig.category.delete.path,
        ]
    },
    categoryJobsUpdate: {
        path: '/category-jobs/:id',
        component:CategoryJobsUpdate,
        permissions: [
            apiConfig.category.create.path,
            apiConfig.category.update.path,
        ]
    },
    categoryDepartments: {
        path: '/category-departments',
        childrenKeys:['/category-departments/:id','/category-departments/create'],
        component:CategoryDepartmentsListPage,
        permissions: [
            apiConfig.category.getList.path,
            apiConfig.category.getById.path,
            apiConfig.category.create.path,
            apiConfig.category.update.path,
            apiConfig.category.delete.path,
        ]
    },
    categoryDepartmentsUpdate: {
        path: '/category-departments/:id',
        component:CategoryDepartmentsUpdate,
        permissions: [
            apiConfig.category.getList.path,
            apiConfig.category.getById.path,
            apiConfig.category.create.path,
            apiConfig.category.update.path,
            apiConfig.category.delete.path,
        ]
    },
    adminNews: {
        path: '/news',
        component:NewsListPage,
        permissions: [
            apiConfig.news.getList.path,
            apiConfig.news.getById.path, //xxxx dup
            apiConfig.news.create.path, //xxxx dup
            apiConfig.news.update.path, //xxxx dup
            apiConfig.news.delete.path,
            apiConfig.news.categoryAutoComplete.path,
        ]
    },
    adminNewsUpdate: {
        path: '/news/:id',
        component:NewsUpdate,
        permissions: [
            apiConfig.news.getById.path, //xxxx dup
            apiConfig.news.create.path, //xxxx dup
            apiConfig.news.update.path, //xxxx dup
            apiConfig.news.delete.path,
            apiConfig.news.categoryAutoComplete.path,
        ]
    },
    province:{
        path:'/province',
        component:ProvinceListPage,
        childrenKeys: ['/province-district','/province-district-commune'],
        permissions:[
            apiConfig.province.getList.path,
            apiConfig.province.getById.path,
            apiConfig.province.create.path,
            apiConfig.province.update.path,
            apiConfig.province.delete.path,
            apiConfig.province.provinceAutoComplete.path,
        ]
    },
    district:{
        path:'/province-district',
        component:DistrictListPage,
        permissions:[
            apiConfig.province.getList.path,
            apiConfig.province.getById.path,
            apiConfig.province.create.path,
            apiConfig.province.update.path,
            apiConfig.province.delete.path,
            apiConfig.province.provinceAutoComplete.path,
        ]
    },
    commune:{
        path:'/province-district-commune',
        component:CommuneListPage,
        permissions:[
            apiConfig.province.getList.path,
            apiConfig.province.getById.path,
            apiConfig.province.create.path,
            apiConfig.province.update.path,
            apiConfig.province.delete.path,
            apiConfig.province.provinceAutoComplete.path,
        ]
    },
    customer: {
        path: '/customer',
        component:CustomerListPage,
        childrenKeys: ['/customer/create','/customer/:id','/address','/address/:id'],  //nếu có trang Update thì để childPath dạng ['/parent/create','/parent/update']
        permissions: [
            apiConfig.customer.getList.path,
            apiConfig.customer.getById.path,
            apiConfig.customer.create.path,
            apiConfig.customer.update.path,
            apiConfig.customer.delete.path,
            apiConfig.customer.customerAutoComplete.path,
            apiConfig.addressCustomer.getList.path,
        ]
    },
    customerUpdate: {
        path: '/customer/:id',
        // childrenKeys: ['/address'],
        component:CustomerUpdatePage,
        permissions: [
            apiConfig.customer.getById.path,
            apiConfig.customer.create.path,
            apiConfig.customer.update.path,
        ]
    },
    address: {
        path: '/address',
        component:AddressListPage,
        childrenKeys: ['/address/create'],  //nếu có trang Update thì để childPath dạng ['/parent/create','/parent/update']
        permissions: [
            apiConfig.addressCustomer.getList.path,
            apiConfig.addressCustomer.getById.path,
            apiConfig.addressCustomer.create.path,
            apiConfig.addressCustomer.update.path,
            apiConfig.addressCustomer.delete.path,
        ]
    },
    addressUpdate: {
        path: '/address/:id',
        component:AddressUpdatePage,
        menuActivePath:'/customer',
        permissions: [
            apiConfig.addressCustomer.getById.path,
            apiConfig.addressCustomer.create.path,
            apiConfig.addressCustomer.update.path,
        ],
    },
    ranks: {
        path:'/ranks',
        component:RanksListPage,
        childrenKeys: ['/ranks/create','/ranks/:id'],
        permissions:[
            apiConfig.ranks.getList.path,
            apiConfig.ranks.getById.path,
            apiConfig.ranks.create.path,
            apiConfig.ranks.update.path,
            apiConfig.ranks.delete.path,
            apiConfig.ranks.ranksAutoComplete.path,
        ]
    },
    ranksUpdate: {
        path:'/ranks/:id',
        component:RanksUpdate,
        permissions:[
            apiConfig.ranks.getById.path,
            apiConfig.ranks.create.path,
            apiConfig.ranks.update.path,
            apiConfig.ranks.ranksAutoComplete.path,
        ]
    },
    employee: {
        path: "/employee",
        childrenKeys:["/employee/:id","/employee/create"],
        component: EmployeeListPage,
        permissions: [
            apiConfig.employee.getList.path,
            apiConfig.employee.getById.path,
            apiConfig.employee.create.path,
            apiConfig.employee.update.path,
            apiConfig.employee.delete.path,
            apiConfig.employee.employeeAutoComplete.path,
        ],
      },
      employeeUpdate: {
        path: "/employee/:id",
        component: EmployeeUpdate,
        permissions: [
            apiConfig.employee.getList.path,
            apiConfig.employee.getById.path,
            apiConfig.employee.create.path,
            apiConfig.employee.update.path,
            apiConfig.employee.delete.path,
            apiConfig.employee.employeeAutoComplete.path,
        ],
      },
}
