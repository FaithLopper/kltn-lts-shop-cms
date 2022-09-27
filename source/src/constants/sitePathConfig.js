import apiConfig from './apiConfig';
import { actions } from '../actions';
import { UserTypes } from '.';
import LoginPage from '../containers/account/LoginPage';
import ProfilePage from '../containers/account/ProfilePage';

// import DashBoard from '../containers/Dashboard';
import UserAdminListPage from '../containers/users/UserAdminListPage';

import NotFound from '../compoments/common/NotFound';
import Forbidden from '../containers/Forbidden';
import GroupPermissionListPage from '../containers/groupPermission/GroupPermissionListPage';
import CategoryListPage from '../containers/category/CategoryListPage';
import CategoryListPageChild from '../containers/category/CategoryListPageChild';
import NewsListPage from '../containers/adminNews/NewsListPage';
import UserAminUpdate from '../containers/users/UserAminUpdate';
import ProvinceListPage from '../containers/province/ProvinceListPage';
import DistrictListPage from '../containers/province/DistrictListPage';
import CommuneListPage from '../containers/province/CommuneListPage';

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
        permissions: [
            apiConfig.user.getAdminList.path,
            apiConfig.user.getAdminById.path,
            apiConfig.user.createAdmin.path,
            apiConfig.user.updateAdmin.path,
            apiConfig.user.deleteAdmin.path
        ]
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
    // groupPermissionUpdate: {
    //     path: '/group-permission/:id',
    //     component:Gr,
    //     permissions: [
    //         apiConfig.groupPermission.update.path,
    //         'not_have_delete',
    //         apiConfig.groupPermission.getPermissionList.path,
    //     ]
    // },
    category: {
        path: '/category',
        component:CategoryListPage,
        childrenKeys: ['/category-child'],
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
            apiConfig.news.getById.path,
            apiConfig.news.create.path,
            apiConfig.news.update.path,
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
    commune:{
        path:'/province-district-commune',
        component:CommuneListPage,
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
}