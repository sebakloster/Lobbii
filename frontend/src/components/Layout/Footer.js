import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Input, Label } from "reactstrap";

//Import Icons
import FeatherIcon from "feather-icons-react";

// import images
import americanEx from "../../assets/images/payments/american-ex.png";
import discover from "../../assets/images/payments/discover.png";
import masterCard from "../../assets/images/payments/master-card.png";
import paypal from "../../assets/images/payments/paypal.png";
import visa from "../../assets/images/payments/visa.png";

//Import Images
import logolight from "../../assets/images/logo-light.png";
import logodark from "../../assets/images/logo-dark.png";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid1: [
        { title: "Blog", link: "/blog" },
        { title: "Iniciar sesión", link: "/login" },
        { title: "Registrarme", link: "/register" },
        { title: "Contacto", link: "/contact-us" },
      ],
      grid2: [{ title: "Para especialistas", link: "/para-especialistas" }],
      paymentCardData: [
        {
          img: americanEx,
          title: "American Express",
        },
        {
          img: discover,
          title: "Discover",
        },
        {
          img: masterCard,
          title: "Master Card",
        },
        {
          img: paypal,
          title: "Paypal",
        },
        {
          img: visa,
          title: "Visa",
        },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        <footer className="footer">
          <Container>
            <Row>
              <Col className="col-12">
                <div
                  className={
                    this.props.isBorderLine
                      ? "footer-py-60 footer-border"
                      : "footer-py-60"
                  }
                >
                  <Row>
                    <Col lg={4} className="col-12 mb-0 mb-md-4 pb-0 pb-md-2">
                      <Link to="/home" className="logo-footer">
                        <img
                          src={this.props.isLight ? logodark : logolight}
                          height="60"
                          alt="mindly logo"
                        />
                      </Link>
                      <p
                        className={
                          this.props.isLight ? "mt-4 text-muted" : "mt-4"
                        }
                      >
                        Empeza a cuidar tu mente de la mano de Mindly y
                        conviertete en tu mejor version.
                      </p>
                      <ul
                        className={
                          this.props.isLight
                            ? "list-unstyled social-icon social mb-0 m t-4"
                            : "list-unstyled social-icon foot-social-icon mb-0 mt-4"
                        }
                      >
                        <li className="list-inline-item me-1">
                          <a
                            href="https://web.facebook.com/people/Mindly/61550195502102/"
                            className="rounded"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FeatherIcon
                              icon="facebook"
                              className="fea icon-sm fea-social"
                            />
                          </a>
                        </li>
                        <li className="list-inline-item me-1">
                          <a
                            href="https://www.instagram.com/mindly.la/"
                            className="rounded"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FeatherIcon
                              icon="instagram"
                              className="fea icon-sm fea-social"
                            />
                          </a>
                        </li>
                        <li className="list-inline-item me-1">
                          <a
                            href="https://www.linkedin.com/company/mindly-la/"
                            className="rounded"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FeatherIcon
                              icon="linkedin"
                              className="fea icon-sm fea-social"
                            />
                          </a>
                        </li>
                      </ul>
                    </Col>

                    <Col
                      lg={2}
                      md={4}
                      className="col-12 mt-4 mt-sm-0 pt-2 pt-sm-0"
                    >
                      <h5
                        className={
                          this.props.isLight
                            ? "text-dark footer-head"
                            : "text-light footer-head"
                        }
                      >
                        Mindly
                      </h5>
                      <ul className="list-unstyled footer-list mt-4">
                        {this.state.grid1.map((grid, key) => (
                          <li key={key}>
                            <Link
                              to={grid.link}
                              className={
                                this.props.isLight ? "text-muted" : "text-foot"
                              }
                            >
                              <i className="uil uil-angle-right-b me-1"></i>{" "}
                              {grid.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Col>

                    <Col
                      lg={3}
                      md={4}
                      className="col-12 mt-4 mt-sm-0 pt-2 pt-sm-0"
                    >
                      <h5
                        className={
                          this.props.isLight
                            ? "text-dark footer-head"
                            : "text-light footer-head"
                        }
                      >
                        Servicios
                      </h5>
                      <ul className="list-unstyled footer-list mt-4">
                        {this.state.grid2.map((grid, key) => (
                          <li key={key}>
                            <Link
                              to={grid.link}
                              className={
                                this.props.isLight ? "text-muted" : "text-foot"
                              }
                            >
                              <i className="uil uil-angle-right-b me-1"></i>{" "}
                              {grid.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Col>

                    <Col
                      lg={3}
                      md={4}
                      className="col-12 mt-4 mt-sm-0 pt-2 pt-sm-0"
                    >
                      <h5
                        className={
                          this.props.isLight
                            ? "text-dark footer-head"
                            : "text-light footer-head"
                        }
                      >
                        Legal
                      </h5>
                      <ul className="list-unstyled footer-list mt-4">
                        <li>
                          <Link
                            to="/terminos-y-condiciones"
                            className={
                              this.props.isLight ? "text-muted" : "text-foot"
                            }
                          >
                            <i className="uil uil-angle-right-b me-1"></i>{" "}
                            Términos y condiciones
                          </Link>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
          <Container>
            <p className="m-5 mt-0">
              Si tú o alguien que conoces se encuentra en situación de peligro o
              emergencia , no recurras a esta web para la obtención de ayuda
              inmediata. Contacta el{" "}
              <a
                className="text-warning"
                href="https://kinnected.org/emergency-services"
                target="_blank"
                rel="noreferrer"
              >
                número de emergencia
              </a>{" "}
              correspondiente a tu país de residencia.<br></br> © 2024 Mindly
              Care LLC
            </p>
          </Container>
          <div className="footer-py-30 footer-bar">
            <Container className="text-center">
              <Row className="align-items-center">
                <Col sm={6}>
                  <div className="text-sm-start">
                    <p className="mb-0">
                      © {new Date().getFullYear()} Mindly Care LLC. Desarrollado
                      con <i className="mdi mdi-heart text-danger"></i> por
                      Latinos.
                    </p>
                  </div>
                </Col>

                <Col sm={6} className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                  <ul className="list-unstyled text-sm-end mb-0 d-flex gap-1 flex-wrap justify-content-sm-end">
                    {this.state.paymentCardData.map((item, key) => (
                      <li className="list-inline-item" key={key}>
                        <Link to="#">
                          <img
                            src={item.img}
                            className="avatar avatar-ex-sm"
                            title={item.title}
                            alt="payment icon"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
            </Container>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Footer;
