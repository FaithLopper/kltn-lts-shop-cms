import React from "react";
import { Route } from "react-router-dom";
import { useEffect } from "react";
import MasterLayout1 from "../compoments/common/appLayout/MasterLayout1";
import { sitePathConfig } from "../constants/sitePathConfig";
import Utils from "../utils";
const { isMobileDevice } = Utils;
const isMobile = isMobileDevice();
const CustomRoute1 = ({ component: Component, ...rest }) => {
  useEffect(() => {
    const additionalClassNameBodyTag = isMobile ? "bd-mobile" : "bd-desktop";
    document.body.classList.add(additionalClassNameBodyTag);
  }, []);
  const siteConfig = Object.values(sitePathConfig).find(
    (s) => s.path === rest.path
  )?.siteConfig;
  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {!isMobile ? (
            <>
              {" "}
              <div className="master-layout-desktop">
                <Component {...props} />
              </div>
            </>
          ) : (
            <>
              <div className="master-layout-mobile">
                <Component {...props} />
              </div>
            </>
          )}
        </>
      )}
    />
  );
};

export default CustomRoute1;
