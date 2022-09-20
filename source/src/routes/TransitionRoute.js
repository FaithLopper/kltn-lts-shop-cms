import React from "react";
import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Utils from "../utils";
import { sitePathConfig as routesArr} from "../constants/sitePathConfig";
function TransitionRoute({location,getRedirect,setShowModal,t,routes,dispatch}) {
  const { isMobileDevice } = Utils;
  const isMobile = isMobileDevice();
  useEffect(() => {
    const additionalClassNameBodyTag = isMobile ? "bd-mobile" : "bd-desktop";
    document.body.classList.add(additionalClassNameBodyTag);
  }, []);
  const SwitchDesktopRoute = ({ routesArr, location }) => {
    return (
      <Switch location={location}>
        {routesArr.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact ?? true}
              render={(props) => {
                const PageComponent = route.component;
                return (
                  <div className="master-layout-desktop">
                    <PageComponent {...props} />
                  </div>
                );
              }}
            />
          );
        })}
      </Switch>
    );
  };
  const SwitchMobileRoute = ({ routesArr, location,setShowModal }) => {
    return (
      <Switch location={location}>
        {routesArr.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact ?? true}
              render={(props) => {
                const PageComponent = route.component;
                return (
                  <div className="master-layout-mobile">
                    <PageComponent {...props}  setShowModal={setShowModal}/>
                  </div>
                );
              }}
            />
          );
        })}
      </Switch>
    );
  };
  return isMobile ? (
    <SwitchMobileRoute
      routesArr={routesArr}
      location={location}
      getRedirect={getRedirect}
      setShowModal={setShowModal}
      t={t}
      routes={routes}
      dispatch={dispatch}
    />
  ) : (
    <SwitchDesktopRoute
      routesArr={routesArr}
      location={location}
      getRedirect={getRedirect}
      t={t}
      routes={routes}
      dispatch={dispatch}
    />
  );
}

export default TransitionRoute;
