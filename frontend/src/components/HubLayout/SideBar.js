import React from "react";
import { Link, useLocation } from "react-router-dom";
import { withRouter } from "react-router";

function SideBar() {
  const location = useLocation();

  const renderNavLink = (linkIndex, iconName, linkText, path) => {
    const isActive = location.pathname === path;
    const linkClassNames = `nav-link ${isActive ? "active" : ""}`;

    return (
      <li className={linkClassNames} key={linkIndex}>
        <Link to={path}>
          <i className={`bx ${iconName} icon`}></i>
        </Link>
      </li>
    );
  };

  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
        rel="stylesheet"
      />

      <nav className="sidebar open">
        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links p-0">
              {renderNavLink(0, "bx-grid-alt", "", "/my-profile")}
              {renderNavLink(1, "bx-edit", "", "/posts")}
              {renderNavLink(2, "bx-purchase-tag-alt", "", "/products")}
              {renderNavLink(3, "bx-link", "", "/connect-social-media")}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default withRouter(SideBar);
