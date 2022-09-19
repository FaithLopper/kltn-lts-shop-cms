import apiConfig from './apiConfig';
import { actions } from '../actions';
import { UserTypes } from '.';

export const sitePathConfig = {
    login: {
        path: '/login'
    },
    profile: {
        path: '/profile'
    },
    admin: {
        path: '/admins',
        permissions: [
            apiConfig.user.getAdminList.path,
            apiConfig.user.getAdminById.path,
            apiConfig.user.createAdmin.path,
            apiConfig.user.updateAdmin.path,
            apiConfig.user.deleteAdmin.path
        ]
    },
    forbidden: {
        path: '/forbidden'
    },
    groupPermission: {
        path: '/group-permission',
        permissions: [
            apiConfig.groupPermission.getList.path,
            apiConfig.groupPermission.getById.path,
            apiConfig.groupPermission.create.path,
            apiConfig.groupPermission.update.path,
            'not_have_delete',
            apiConfig.groupPermission.getPermissionList.path,
        ]
    },
    category: {
        path: '/category',
        childrenKeys: ['/category-child'],
        permissions: [
            apiConfig.category.getList.path,
            apiConfig.category.getById.path,
            apiConfig.category.create.path,
            apiConfig.category.update.path,
            apiConfig.category.delete.path,
        ]
    }, 
    province:{
        path:'/province',
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
    adminNews: {
        path: '/news',
        permissions: [
            apiConfig.news.getList.path,
            apiConfig.news.getById.path,
            apiConfig.news.create.path,
            apiConfig.news.update.path,
            apiConfig.news.delete.path,
            apiConfig.news.categoryAutoComplete.path,
        ]
    },
    importExport: {
        path: '/import',
        permissions: [
            apiConfig.importExport.getList.path,
            apiConfig.importExport.getById.path,
            apiConfig.importExport.create.path,
            apiConfig.importExport.update.path,
            apiConfig.importExport.delete.path,
            apiConfig.importExport.categoryAutoComplete.path,
        ]
    },
    landPage:{
        path:'/demo'
    }
}