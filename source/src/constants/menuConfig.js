import React from 'react';

import {
    UsergroupAddOutlined,
    ControlOutlined,
    FileTextOutlined,
    UserOutlined,
    QuestionOutlined,
    UnorderedListOutlined,
    InboxOutlined,
    UserAddOutlined,
    ShoppingCartOutlined,
    CarryOutOutlined,
} from '@ant-design/icons';
import { sitePathConfig } from '../constants/sitePathConfig';
import store from '../store';
import { actions } from "../actions";
import qs from 'query-string';
import { showErrorMessage } from '../services/notifyService';
import apiConfig from './apiConfig';

const strParams = params => {
    return qs.stringify(params)
}

const navMenuConfig = [
    {
        label: 'Account Management',
        icon: <UsergroupAddOutlined />,
        children: [
            {
                label: 'Admin',
                ...sitePathConfig.admin
            },
        ]
    },
    {
        label: 'System',
        icon: <ControlOutlined />,
        children: [
            {
                label: 'Role',
                ...sitePathConfig.groupPermission
            },
        ]
    },
    {
        label: 'Category',
        icon: <UnorderedListOutlined />,
        children: [
            {
                label: 'Category',
                ...sitePathConfig.category,
            },
        ]
    },
    {
        label: 'News',
        icon: <FileTextOutlined />,
        children: [
            {
                label: 'News',
                ...sitePathConfig.adminNews
            },
        ],
    },
]

export { navMenuConfig };
