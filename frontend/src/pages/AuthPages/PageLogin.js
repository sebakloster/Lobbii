// React Basic and Bootstrap
import React, { useState, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  Card,
  CardBody,
  FormFeedback,
  Alert,
  Spinner,
} from "reactstrap";
import axiosInstance from "../../helpers/axiosConfig";
import { Helmet } from "react-helmet";
import "../../assets/css/login.css";
import autoAnimate from "@formkit/auto-animate";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
//Import Icons
import FeatherIcon from "feather-icons-react";

import logo from "../../assets/images/lobbii-logo.png";

const PageLogin = () => {
  const [error, setError] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //Animations
  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current, { duration: 200 });
  }, [parent]);
  const parent2 = useRef(null);
  useEffect(() => {
    parent2.current && autoAnimate(parent2.current, { duration: 200 });
  }, [parent2]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string("Email")
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Your password must be at least 8 characters long")
        .required("Enter your password"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      values.email = values.email.toLowerCase();
      const { email, password } = values;
      const expiresAt = new Date().getTime() + 1000 * 60 * 60 * 11;
      try {
        const response = await axiosInstance.post("/auth/login", {
          email,
          password,
        });
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("expiresAt", expiresAt);

        setRedirectTo("/my-profile");
      } catch (error) {
        setError("User or password incorrect");
      }
      setIsLoading(false);
    },
  });

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <div className="login-section">
      <Helmet>
        <title>Lobbii | Sing in</title>
        <meta name="description" content="Sing in" />
      </Helmet>
      {error && (
        <Alert className="bg-soft-danger fw-medium main-error-alert">
          <i className="uil uil-info-circle fs-5 align-middle me-1"></i>
          {error}
        </Alert>
      )}
      <section className="bg-login d-flex align-items-center">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col className="auth-form-login" lg={5} md={6}>
              <Card className="login-page shadow rounded border-0">
                <CardBody>
                  <div className="card-title text-center">
                    <a href="/home">
                      <img
                        className="auth-logo mx-auto"
                        src={logo}
                        alt="lobbii logo"
                      ></img>
                    </a>
                    <h4 className="m-2 text-white">Sing in</h4>
                  </div>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                    className="login-form mt-4"
                  >
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3" ref={parent2}>
                          <Label className="form-label" htmlFor="email">
                            Email <span className="text-danger">*</span>
                          </Label>
                          <div className="form-icon position-relative">
                            <i>
                              <FeatherIcon
                                icon="user"
                                className="fea icon-sm icons"
                              />
                            </i>
                          </div>
                          <Input
                            type="text"
                            className="form-control ps-5"
                            name="email"
                            id="email"
                            placeholder="Email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                              validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col lg={12}>
                        <div className="mb-3" ref={parent}>
                          <Label className="form-label" htmlFor="password">
                            Password <span className="text-danger">*</span>
                          </Label>
                          <div className="form-icon position-relative">
                            <i>
                              <FeatherIcon
                                icon="key"
                                className="fea icon-sm icons"
                              />
                            </i>
                          </div>
                          <Input
                            type="password"
                            className="form-control ps-5"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.password || ""}
                            invalid={
                              validation.touched.password &&
                              validation.errors.password
                                ? true
                                : false
                            }
                          />
                          {validation.touched.password &&
                          validation.errors.password ? (
                            <FormFeedback type="invalid">
                              {validation.errors.password}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={12} className="mb-0">
                        <div className="d-grid">
                          <Button
                            to="/my-profile"
                            className="btn btn-primary d-flex align-items-center justify-content-center"
                            type="submit"
                          >
                            {isLoading ? (
                              <Spinner size="sm" className="mx-2"></Spinner>
                            ) : (
                              <i className="bx bx-calendar-plus"></i>
                            )}
                            <p className="m-0">Sing in</p>
                          </Button>
                        </div>
                      </Col>
                      <Col xs={12} className="text-center">
                        <p className="mb-0 mt-3">
                          <small className="text-muted me-2">
                            New to Lobbii?
                          </small>{" "}
                          <Link to="/register" className="text-muted fw-bold">
                            Create your Lobbii account
                          </Link>
                        </p>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};
export default PageLogin;
