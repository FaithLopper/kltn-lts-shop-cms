import React from 'react';
import { Switch, BrowserRouter, Redirect } from 'react-router-dom';

import { sitePathConfig } from '../constants/sitePathConfig';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

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
import CategoryNewsListPage from '../containers/category/CategoryNewsListPage';
import CategoryNewsUpdate from '../containers/category/CategoryNewsUpdate';
import CategoryDepartmentsListPage from '../containers/category/CategoryDepartmentsListPage';
import CategoryJobsListPage from '../containers/category/CategoryJobsListPage';
import CategoryJobsUpdate from '../containers/category/CategoryJobsUpdate';
import CategoryDepartmentsUpdate from '../containers/category/CategoryDepartmentsUpdate';
const RootRoute = () => {
    const {
        admin,
        login,
        profile,
        forbidden,
        groupPermission,
        categoryDepartments,
        categoryJobs,
        categoryNews,
        categoryDepartmentsUpdate,
        categoryJobsUpdate,
        categoryNewsUpdate,
        adminNews,
        adminUpdate,
        adminNewsUpdate,
        categoryUpdate
    } = sitePathConfig;

    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to={{
                    pathname: admin.path,
                    state: { isRedirectToHomePage: true }
                }}/>
                <PublicRoute exact path={login.path} component={LoginPage} />
                <PrivateRoute exact path={profile.path} component={ProfilePage}/>
                <PrivateRoute exact path={admin.path} component={UserAdminListPage}/>
                <PrivateRoute exact path={adminUpdate.path} component={UserAminUpdate}/>
                <PrivateRoute exact path={groupPermission.path} component={GroupPermissionListPage}/>
                <PrivateRoute exact path={categoryNews.path} component={CategoryNewsListPage}/>
                <PrivateRoute exact path={categoryNewsUpdate.path} component={CategoryNewsUpdate}/>
                <PrivateRoute exact path={categoryJobs.path} component={CategoryJobsListPage}/>
                <PrivateRoute exact path={categoryJobsUpdate.path} component={CategoryJobsUpdate}/>
                <PrivateRoute exact path={categoryDepartments.path} component={CategoryDepartmentsListPage}/>
                <PrivateRoute exact path={categoryDepartmentsUpdate.path} component={CategoryDepartmentsUpdate}/>
                <PrivateRoute exact path={adminNews.path} component={NewsListPage}/>
                {/* Error Page */}
                <PrivateRoute exact path={forbidden.path} component={Forbidden}/>
                {/* <Route exact path="/error" component={ErrorServer} /> */}
                {/* 404 Page */}
                <PublicRoute component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default RootRoute;
