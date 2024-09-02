import React from "react";

import logoImg from "../../assets/images/lobbii-logo.png";

function TopBar() {
  return (
    <>
      <header className="main-head">
        <div className="topbar-container">
          <div>
            <a href="/my-profile">
              <img src={logoImg} className="topbar-logo" alt="Lobbii Logo" />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

export default TopBar;
