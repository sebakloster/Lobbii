import React, { Component, Suspense } from "react";
import { withRouter } from "react-router-dom";

// Layout Components
const Topbar = React.lazy(() => import("./Topbar"));
const Footer = React.lazy(() => import("./Footer"));

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

class Layout extends Component {
  render() {
    return (
      <div className="overflow-hidden">
        <Suspense fallback={Loader()}>
          {(() => {
            if (
              this.props.location.pathname === "/login" ||
              this.props.location.pathname === "/register"
            ) {
              return <></>;
            } else {
              return <Topbar hasDarkTopBar={this.props.hasDarkTopBar} />;
            }
          })()}
          {this.props.children}
          {(() => {
            if (
              //ACA SE AGREGAN LAS RUTAS QUE NO VAN A TENER EL FOOTER
              this.props.location.pathname === "/login" ||
              this.props.location.pathname === "/register"
            ) {
              return <></>;
            } else {
              return <Footer />;
            }
          })()}
        </Suspense>
      </div>
    );
  }
}

export default withRouter(Layout);
