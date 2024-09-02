import React from "react";
import { Redirect } from "react-router-dom";

const withAuth = (Component) => {
  const AuthRoute = (props) => {
    const authToken = localStorage.getItem("authToken");
    const expiresAt = localStorage.getItem("expiresAt");
    const role = localStorage.getItem("role");
    const currentTime = new Date().getTime();

    if (!authToken || (expiresAt && currentTime >= expiresAt)) {
      if (authToken) localStorage.removeItem("authToken");
      if (role) localStorage.removeItem("role");
      if (expiresAt) localStorage.removeItem("expiresAt");

      return <Redirect to="/login" />;
    }

    return <Component {...props} />;
  };

  return AuthRoute;
};

export default withAuth;
