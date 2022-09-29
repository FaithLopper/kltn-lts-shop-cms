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
import ProvinceListPage from '../containers/province/ProvinceListPage';
import DistrictListPage from '../containers/province/DistrictListPage';
import CommuneListPage from '../containers/province/CommuneListPage';
const RootRoute = () => {
    const {
        admin,
        login,
        profile,
        forbidden,
        groupPermission,
        category,
        adminNews,
        adminUpdate,
        province,
        provinceUpdate,
    } = sitePathConfig;

    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to={{
                    pathname: admin.path,
                    state: { isRedirectToHomePage: true }
                }}/>
                <PublicRoute exact path={login.path} component={LoginPage} />
                {Object.keys(sitePathConfig).map(key => {
                    // const CompRoute = siteConfig[key].isPublic ? PublicRoute : PrivateRoute;
                    const CompRoute = PrivateRoute;
                    return (
                        <CompRoute
                            key={sitePathConfig[key].path}
                            exact
                            path={sitePathConfig[key].path}
                            component={sitePathConfig[key].component}
                        />
                    );
                })}
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
