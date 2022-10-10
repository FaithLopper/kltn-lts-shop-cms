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
    BankOutlined,
    CrownOutlined,
    HomeOutlined
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
            {
                label: 'Customer',
                ...sitePathConfig.customer
            },
            {
                label: 'Employee',
                ...sitePathConfig.employee
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
                label: 'CategoryNews',
                ...sitePathConfig.categoryNews,
            },
            {
                label: 'CategoryJobs',
                ...sitePathConfig.categoryJobs,
            },
            {
                label: 'CategoryDepartments',
                ...sitePathConfig.categoryDepartments,
            },
        ]
    },
    {
        label: 'Product',
        icon: <UnorderedListOutlined />,
        children: [
            {
                label: 'categoryProductManagement',
                ...sitePathConfig.categoryProduct,
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
    {
        label: 'Province',
        icon: <BankOutlined />,
        children: [
            {
                label: 'Province',
                ...sitePathConfig.province,
            },
        ]
    },
    {
        label: 'Ranks',
        icon: <CrownOutlined />,
        children: [
            {
            label: 'Ranks',
                ...sitePathConfig.ranks,
            },
        ]
    },
    {
        label: 'Store',
        icon: <HomeOutlined />,
        children: [
            {
            label: 'Store',
                ...sitePathConfig.store,
            },
        ]
    },
]

const employeeNavMenuConfig = [
  {
      label: 'customerManagement',
      icon: <UsergroupAddOutlined />,
      children: [
        {
            label: 'Admin',
            ...sitePathConfig.admin
        },
          {
              label: 'Customer',
              ...sitePathConfig.customer
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

export { navMenuConfig, employeeNavMenuConfig};
