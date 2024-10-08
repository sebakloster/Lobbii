import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import "react-drawer/lib/react-drawer.css";
import { Container } from "reactstrap";

//Import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";

import NavbarButtons from "../Shared/NavbarButtons";

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpenShop: false,
      wishlistModal: false,
      dropdownIsOpen: false,
      open: false,
      position: "right",
      dropdownOpen: false,
      landing: false,
      components: false,
      demo: false,
      doc: false,
      pages: false,
      company: false,
      account: false,
      email: false,
      blog: false,
      case: false,
      auth: false,
      login: false,
      signup: false,
      reset: false,
      utility: false,
      special: false,
      contact: false,
      multi: false,
      level2: false,
    };
    this.toggleLine = this.toggleLine.bind(this);
    this.toggleDropdownShop.bind(this);
    this.toggleWishlistModal.bind(this);
    this.toggleDropdownIsOpen.bind(this);
    this.toggleRightDrawer = this.toggleRightDrawer.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
    this.toggleDropdown.bind(this);
    this.togglemodal.bind(this);
  }

  /**
   * Right sidebar drawer
   **/

  toggleRightDrawer = () => {
    this.setState({ position: "right" });
    this.setState({ open: !this.state.open });
  };
  onDrawerClose = () => {
    this.setState({ open: false });
  };

  toggleWishlistModal = () => {
    this.setState((prevState) => ({
      wishlistModal: !prevState.wishlistModal,
    }));
  };

  toggleDropdownShop = () => {
    this.setState({
      dropdownOpenShop: !this.state.dropdownOpenShop,
    });
  };
  toggleDropdownIsOpen = () => {
    this.setState({
      dropdownIsOpen: !this.state.dropdownIsOpen,
    });
  };

  toggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };
  togglemodal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  toggleLine() {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }
  initMenu() {
    this.activateParentDropdown();
  }

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      this.initMenu();
    }
  }

  activateParentDropdown() {
    var menuItems = document.getElementsByClassName("sub-menu-item");

    if (menuItems) {
      var matchingMenuItem = null;
      for (var idx = 0; idx < menuItems.length; idx++) {
        if (menuItems[idx].href === window.location.href) {
          matchingMenuItem = menuItems[idx];
        }
      }

      if (matchingMenuItem) {
        matchingMenuItem.classList.add("active");

        const immediateParent = matchingMenuItem.closest("li");
        if (immediateParent) {
          immediateParent.classList.add("active");
        }
        const parent = immediateParent.closest(".parent-menu-item");

        if (parent) {
          parent.classList.add("active");

          var parentMenuitem = parent.querySelector("a");
          if (parentMenuitem) {
            parentMenuitem.classList.add("active");
          }
          var parentOfParent = parent.closest(".parent-parent-menu-item");
          if (parentOfParent) {
            parentOfParent.classList.add("active");
          }
        } else {
          parentOfParent = matchingMenuItem.closest(".parent-parent-menu-item");
          if (parentOfParent) {
            parentOfParent.classList.add("active");
          }
        }
      }
      return false;
    }
    return false;
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.initMenu();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.tagline ? this.props.tagline : null}

        <header id="topnav" className="defaultscroll sticky">
          <Container>
            <div>
              {this.props.hasDarkTopBar ? (
                <Link className="logo" to="/">
                  <img
                    src={logodark}
                    height="24"
                    className="logo-light-mode"
                    alt="mindly logo"
                  />
                  <img
                    src={logolight}
                    height="24"
                    className="logo-dark-mode"
                    alt="mindly logo"
                  />
                </Link>
              ) : (
                <Link className="logo" to="/">
                  <span className="logo-light-mode">
                    <img src={logodark} className="l-dark" height="24" alt="" />
                    <img
                      src={logolight}
                      className="l-light"
                      height="24"
                      alt="mindly logo"
                    />
                  </span>
                  <img
                    src={logolight}
                    height="24"
                    className="logo-dark-mode"
                    alt="mindly logo"
                  />
                </Link>
              )}
            </div>
            <Link to="/register" className="button-menu-mobile btn btn-primary">
              Prueba ahora
            </Link>
            <div className="menu-extras">
              <div className="menu-item">
                <Link
                  to="#"
                  onClick={this.toggleLine}
                  className={
                    this.state.isOpen ? "navbar-toggle open" : "navbar-toggle"
                  }
                >
                  <div className="lines">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </Link>
              </div>
            </div>
            {(() => {
              if (this.props.location.pathname === "/index-developer") {
                return <NavbarButtons />;
              } else if (
                this.props.location.pathname === "/index-it-solution-two"
              ) {
                return (
                  // <ul className="buy-button list-inline mb-0">
                  //   <li className="list-inline-item mb-0">
                  //     <Dropdown
                  //       isOpen={this.state.dropdownOpen}
                  //       toggle={this.toggleDropdown}
                  //     >
                  //       <DropdownToggle
                  //         color="none"
                  //         type="button"
                  //         className="btn-link text-decoration-none dropdown-toggle p-0 pe-2"
                  //       >
                  //         <i className="uil uil-search text-muted"></i>
                  //       </DropdownToggle>
                  //       <DropdownMenu
                  //         end
                  //         className="dd-menu dropdown-menu-end bg-white shadow rounded border-0 mt-3 py-0"
                  //         style={{ width: "300px" }}
                  //       >
                  //         <div className="search-bar">
                  //           <Form className="searchform">
                  //             <input
                  //               type="text"
                  //               id="text"
                  //               name="name"
                  //               className="form-control border rounded"
                  //               placeholder="Search..."
                  //             />
                  //           </Form>
                  //         </div>
                  //       </DropdownMenu>
                  //     </Dropdown>
                  //   </li>{" "}
                  //   <li className="list-inline-item mb-0">
                  //     <Link to="#" onClick={this.toggleRightDrawer}>
                  //       <div className="btn btn-icon btn-pills btn-primary settingbtn">
                  //         <FeatherIcon
                  //           icon="settings"
                  //           className="fea icon-sm"
                  //         />
                  //       </div>
                  //     </Link>
                  //   </li>{" "}
                  //   <li className="list-inline-item ps-1 mb-0">
                  //     <Link
                  //       to="//1.envato.market/landrickreactjs"
                  //       target="_blank"
                  //       rel="noreferrer"
                  //     >
                  //       <div
                  //         id="buyButton"
                  //         className="btn btn-icon btn-pills btn-primary shoppingbtn"
                  //       >
                  //         <FeatherIcon
                  //           icon="shopping-cart"
                  //           className="fea icon-sm"
                  //         />
                  //       </div>
                  //     </Link>
                  //   </li>
                  // </ul>
                  <></>
                );
              } else if (
                this.props.location.pathname === "/shop-grids" ||
                this.props.location.pathname === "/shop-lists"
              ) {
                return (
                  // <ul className="buy-button list-inline mb-0">
                  //   <li className="list-inline-item mb-0">
                  //     <Dropdown
                  //       isOpen={this.state.dropdownOpen}
                  //       toggle={this.toggleDropdown}
                  //     >
                  //       <DropdownToggle
                  //         direction="right"
                  //         color="none"
                  //         type="button"
                  //         className="btn btn-link text-decoration-none p-0 pe-2"
                  //       >
                  //         <i className="mdi mdi-magnify h4 text-muted"></i>
                  //       </DropdownToggle>
                  //       <DropdownMenu
                  //         end
                  //         className="dd-menu bg-white shadow rounded border-0 mt-3 py-0"
                  //         style={{ width: "300px" }}
                  //       >
                  //         <Form>
                  //           <input
                  //             type="text"
                  //             id="text"
                  //             name="name"
                  //             className="form-control border bg-white"
                  //             placeholder="Search..."
                  //           />
                  //         </Form>
                  //       </DropdownMenu>
                  //     </Dropdown>
                  //   </li>
                  //   <li className="list-inline-item mb-0 pe-1">
                  //     <Dropdown
                  //       isOpen={this.state.dropdownOpenShop}
                  //       toggle={this.toggleDropdownShop}
                  //     >
                  //       <DropdownToggle
                  //         type="button"
                  //         className="btn btn-icon btn-soft-primary "
                  //       >
                  //         <i className="uil uil-shopping-cart align-middle icons"></i>
                  //       </DropdownToggle>
                  //       <DropdownMenu
                  //         direction="left"
                  //         className="dd-menu bg-white shadow rounded border-0 mt-3 p-4"
                  //         style={{ width: "300px" }}
                  //       >
                  //         <div className="pb-4">
                  //           <Link to="#" className="media align-items-center">
                  //             <img
                  //               src={shop1}
                  //               className="shadow rounded"
                  //               style={{ maxWidth: "64px" }}
                  //               alt=""
                  //             />
                  //             <div className="flex-1 text-start ms-3">
                  //               <h6 className="text-dark mb-0">T-shirt (M)</h6>
                  //               <p className="text-muted mb-0">$320 X 2</p>
                  //             </div>
                  //             <h6 className="text-dark mb-0">$640</h6>
                  //           </Link>

                  //           <Link
                  //             to="#"
                  //             className="media align-items-center mt-4"
                  //           >
                  //             <img
                  //               src={shop2}
                  //               className="shadow rounded"
                  //               alt=""
                  //               style={{ maxWidth: "64px" }}
                  //             />
                  //             <div className="flex-1 text-start ms-3">
                  //               <h6 className="text-dark mb-0">Bag</h6>
                  //               <p className="text-muted mb-0">$50 X 5</p>
                  //             </div>
                  //             <h6 className="text-dark mb-0">$250</h6>
                  //           </Link>

                  //           <Link
                  //             to="#"
                  //             className="media align-items-center mt-4"
                  //           >
                  //             <img
                  //               src={shop3}
                  //               className="shadow rounded"
                  //               style={{ maxWidth: "64px" }}
                  //               alt=""
                  //             />
                  //             <div className="flex-1 text-start ms-3">
                  //               <h6 className="text-dark mb-0">Watch (Men)</h6>
                  //               <p className="text-muted mb-0">$800 X 1</p>
                  //             </div>
                  //             <h6 className="text-dark mb-0">$800</h6>
                  //           </Link>
                  //         </div>

                  //         <div className="media align-items-center justify-content-between pt-4 border-top">
                  //           <h6 className="text-dark mb-0">Total($):</h6>
                  //           <h6 className="text-dark mb-0">$1690</h6>
                  //         </div>

                  //         <div className="mt-3 text-center">
                  //           <Link to="#" className="btn btn-primary me-2">
                  //             View Cart
                  //           </Link>
                  //           <Link to="#" className="btn btn-primary">
                  //             Checkout
                  //           </Link>
                  //         </div>
                  //         <p className="text-muted text-start mt-1 mb-0">
                  //           *T&C Apply
                  //         </p>
                  //       </DropdownMenu>
                  //     </Dropdown>
                  //   </li>
                  //   <li className="list-inline-item mb-0 pe-1">
                  //     <Link
                  //       to="#"
                  //       className="btn btn-icon btn-soft-primary"
                  //       onClick={this.toggleWishlistModal}
                  //     >
                  //       <i className="uil uil-heart align-middle icons"></i>
                  //     </Link>
                  //   </li>
                  //   <li className="list-inline-item mb-0">
                  //     <Dropdown
                  //       color="primary"
                  //       isOpen={this.state.dropdownIsOpen}
                  //       toggle={this.toggleDropdownIsOpen}
                  //     >
                  //       <DropdownToggle
                  //         type="button"
                  //         className="btn btn-icon btn-soft-primary"
                  //       >
                  //         <i className="uil uil-user align-middle icons"></i>
                  //       </DropdownToggle>
                  //       <DropdownMenu
                  //         direction="left"
                  //         className="dd-menu bg-white shadow rounded border-0 mt-3 py-3"
                  //         style={{ width: "200px" }}
                  //       >
                  //         <Link className="dropdown-item text-dark" to="#">
                  //           <i className="uil uil-user align-middle me-1"></i>{" "}
                  //           Account
                  //         </Link>
                  //         <Link className="dropdown-item text-dark" to="#">
                  //           <i className="uil uil-clipboard-notes align-middle me-1"></i>{" "}
                  //           Order History
                  //         </Link>
                  //         <Link className="dropdown-item text-dark" to="#">
                  //           <i className="uil uil-arrow-circle-down align-middle me-1"></i>{" "}
                  //           Download
                  //         </Link>
                  //         <div className="dropdown-divider my-3 border-top"></div>
                  //         <Link className="dropdown-item text-dark" to="#">
                  //           <i className="uil uil-sign-out-alt align-middle me-1"></i>{" "}
                  //           Logout
                  //         </Link>
                  //       </DropdownMenu>
                  //     </Dropdown>
                  //   </li>
                  // </ul>
                  <></>
                );
              } else if (
                this.props.location.pathname === "/index-apps" ||
                this.props.location.pathname === "/index-classic-app" ||
                this.props.location.pathname === "/index-job"
              ) {
                return (
                  // <ul className="buy-button list-inline mb-0">
                  //   <li className="list-inline-item mb-0">
                  //     <Link to="#" className="btn btn-icon btn-light">
                  //       <img
                  //         src={appStore}
                  //         className="avatar avatar-ex-small p-1"
                  //         alt=""
                  //       />
                  //     </Link>
                  //   </li>{" "}
                  //   <li className="list-inline-item mb-0">
                  //     <Link to="#" className="btn btn-icon btn-light">
                  //       <img
                  //         src={playStore}
                  //         className="avatar avatar-ex-small p-1"
                  //         alt=""
                  //       />
                  //     </Link>
                  //   </li>
                  // </ul>
                  <></>
                );
              } else {
                return (
                  <ul className="buy-button list-inline mb-0">
                    <li className="list-inline-item mb-0">
                      <Link
                        to="/login"
                        onClick={this.toggleRightDrawer}
                        disabled={this.state.open}
                      >
                        <div
                          id="buyButton"
                          className="btn btn-pills btn-soft-primary settingbtn"
                        >
                          Iniciar Sesión
                        </div>
                      </Link>
                    </li>{" "}
                    <li className="list-inline-item ps-1 mb-0">
                      <Link to="/register" rel="noreferrer">
                        <div
                          id="buyButton"
                          className="btn btn-pills shoppingbtn"
                        >
                          Prueba ahora
                        </div>
                      </Link>
                    </li>
                  </ul>
                );
              }
            })()}

            <div
              id="navigation"
              style={{ display: this.state.isOpen ? "block" : "none" }}
            >
              <ul className="navigation-menu nav-dark" id="top-menu">
                <li>
                  <Link to="/blog" className="sub-menu-item">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/para-especialistas" className="sub-menu-item">
                    Para Psicólogos
                  </Link>
                </li>
                <li>
                  <Link to="/contact-us" className="sub-menu-item">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </Container>
        </header>
      </React.Fragment>
    );
  }
}

export default withRouter(Topbar);
