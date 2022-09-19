import React, { Component } from "react";
import AppHeader1 from "./header/AppHeader1";
import AppNavigation1 from "./AppNavigation1";
import AppBody from "./body/AppBody";
import AppFooter1 from "./footer/AppFooter1";
class MasterLayout1 extends Component {
  render() {
    return (
      <>
        <div className="master-layout desktop-screen" style={{"height":"200px"}} id="home">
          <AppHeader1 />
          <AppBody />
          <AppFooter1 />
        </div>
      </>
    );
  }
}
export default MasterLayout1;
