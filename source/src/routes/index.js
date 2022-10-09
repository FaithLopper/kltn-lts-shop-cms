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
import CategoryNewsListPage from '../containers/category/CategoryNewsListPage';
import CategoryNewsUpdate from '../containers/category/CategoryNewsUpdate';
import CategoryJobsListPage from '../containers/category/CategoryJobsListPage';
import CategoryJobsUpdate from '../containers/category/CategoryJobsUpdate';
import CategoryDepartmentsListPage from '../containers/category/CategoryDepartmentsListPage';
import CategoryDepartmentsUpdate from '../containers/category/CategoryDepartmentsUpdate';
import CustomerUpdatePage from '../containers/customer/CustomerUpdatePage';
import AddressListPage from '../containers/customer/AddressListPage';
import AddressUpdatePage from '../containers/customer/AddressUpdatePage';
import RanksListPage from '../containers/ranks/RanksListPage';
import RanksUpdate from '../containers/ranks/RanksUpdate';
import CustomerListPage from '../containers/customer/CustomerListPage';
import NewsUpdate from '../containers/adminNews/NewsUpdate';
import EmployeeListPage from '../containers/employee/EmployeeListPage';
import EmployeeUpdate from '../containers/employee/EmployeeUpdate';
import { UserTypes } from '../constants';
import { actions } from '../actions';
import StoreListPage from '../containers/store/StoreListPage';
import StoreUpdatePage from '../containers/store/StoreUpdatePage';
import variant from '../reducers/variant';
import VariantListPage from '../containers/variant/VariantListPage';

const { getUserData } = actions;
const userData = getUserData();

const RootRoute = () => {
    const {
        admin,
        login,
        profile,
        forbidden,
        groupPermission,
        adminNews,
        adminUpdate,
        province,
        categoryNews,
        categoryNewsUpdate,
        categoryJobs,
        categoryJobsUpdate,
        categoryDepartments,
        categoryDepartmentsUpdate,
        district,
        commune,
        customer,
        customerUpdate,
        address,
        addressUpdate,
        ranks,
        ranksUpdate,
        adminNewsUpdate,
        employee,
        employeeUpdate,
        store,
        storeUpdate,
    } = sitePathConfig;

    const getUserHomeNavigation =()=>{
        if(userData?.kind === UserTypes.ADMIN){
            return {
                pathname: admin.path,
                state: { isRedirectToHomePage: true }
            }
        }
        if(userData?.kind === UserTypes.EMPLOYEE){
            return{
                pathname: adminNews.path,
                state: { isRedirectToHomePage: true }
            }
        }
        return {
            pathname: "/login",
            state: { isRedirectToHomePage: true }
        }
    }

    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to={getUserHomeNavigation()}/>
                <PublicRoute exact path={login.path} component={LoginPage} />
                {/* {Object.keys(sitePathConfig).map(key => {
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
                })} */}
                <PrivateRoute exact path={profile.path} component={ProfilePage}/>
                <PrivateRoute exact path={admin.path} component={UserAdminListPage}/>
                <PrivateRoute exact path={adminUpdate.path} component={UserAminUpdate}/>
                <PrivateRoute exact path={groupPermission.path} component={GroupPermissionListPage}/>
                <PrivateRoute exact path={adminNews.path} component={NewsListPage}/>
                <PrivateRoute exact path={categoryNews.path} component={CategoryNewsListPage}/>
                <PrivateRoute exact path={categoryNewsUpdate.path} component={CategoryNewsUpdate}/>
                <PrivateRoute exact path={categoryJobs.path} component={CategoryJobsListPage}/>
                <PrivateRoute exact path={categoryJobsUpdate.path} component={CategoryJobsUpdate}/>
                <PrivateRoute exact path={categoryDepartments.path} component={CategoryDepartmentsListPage}/>
                <PrivateRoute exact path={categoryDepartmentsUpdate.path} component={CategoryDepartmentsUpdate}/>
                <PrivateRoute exact path={adminNewsUpdate.path} component={NewsUpdate}/>
                <PrivateRoute exact path={province.path} component={ProvinceListPage}/>
                <PrivateRoute exact path={district.path} component={DistrictListPage}/>
                <PrivateRoute exact path={commune.path} component={CommuneListPage}/>
                <PrivateRoute exact path={customer.path} component={CustomerListPage}/>
                <PrivateRoute exact path={customerUpdate.path} component={CustomerUpdatePage}/>
                <PrivateRoute exact path={address.path} component={AddressListPage}/>
                <PrivateRoute exact path={addressUpdate.path} component={AddressUpdatePage}/>
                <PrivateRoute exact path={ranks.path} component={RanksListPage}/>
                <PrivateRoute exact path={ranksUpdate.path} component={RanksUpdate}/>
                <PrivateRoute exact path={employee.path} component={EmployeeListPage}/>
                <PrivateRoute exact path={employeeUpdate.path} component={EmployeeUpdate}/>
                <PrivateRoute exact path={store.path} component={StoreListPage}/>
                <PrivateRoute exact path={storeUpdate.path} component={StoreUpdatePage}/>
                <PrivateRoute exact path={variant.path} component={VariantListPage}/>
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
