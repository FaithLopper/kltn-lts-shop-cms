import React from 'react';
import { Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { sitePathConfig } from '../constants/sitePathConfig';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import NotFound from '../compoments/common/NotFound';
import Forbidden from '../containers/Forbidden';

const RootRoute = () => {
    const {
        admin,
        forbidden,
    } = sitePathConfig;

    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to={{
                    pathname: admin.path,
                    state: { isRedirectToHomePage: true }
                }}/>
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
