import React, { Component } from "react";
import ListBasePage from "../ListBasePage";
import Utils from "../../utils";
import MasterLayout1 from "../../compoments/common/appLayout/MasterLayout1";
import MobileMasterLayout from "../../compoments/common/appLayout/MobileMasterLayout";
const { isMobileDevice } = Utils;
const isMobile = isMobileDevice();
export default class ProductContainer extends Component {
  render() {
    return (
      <>
        {!isMobile ? (
          <MasterLayout1
            // {...props}
            // configPageData={_configPage}
            // NavigatorMenu={NavigatorMenu}
            // setCurrentPathNameChanged={setCurrentPathNameChanged}
          />
        ) : (
          <MobileMasterLayout
            // {...props}
            // configPageData={_configPage}
            // NavigatorMenu={NavigatorMenu}
            // setCurrentPathNameChanged={setCurrentPathNameChanged}
            // t={t}
          />
        )}
      </>
    );
  }
}
