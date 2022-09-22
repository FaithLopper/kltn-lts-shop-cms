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
    adminUpdate: {
        path: '/admins/:id',
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
}