import React, { Component, Suspense } from "react";
import { withRouter } from "react-router-dom";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import "../../assets/css/hubLayout.scss";
import withAuth from "../withAuth";

const Loader = () => {
  return (
    <div id="preloader">
      <div id="status">
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      </div>
    </div>
  );
};

class HubLayout extends Component {
  render() {
    return (
      <React.Fragment>
        <Suspense fallback={Loader()}>
          <TopBar />
          <SideBar />
          <section className="home">
            <section className="body-hub">{this.props.children}</section>
          </section>
        </Suspense>
      </React.Fragment>
    );
  }
}

export default withAuth(withRouter(HubLayout));
