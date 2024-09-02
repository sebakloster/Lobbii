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
import "../../assets/css/singup.css";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import autoAnimate from "@formkit/auto-animate";

//Import Icons
import FeatherIcon from "feather-icons-react";

// import images
import logo from "../../assets/images/lobbii-logo.png";

const PageSignUp = () => {
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
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string("Enter your email")
        .email("Email must be valid")
        .required("Email is required"),

      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Enter your password"),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Repeat your password"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      values.email = values.email.toLowerCase();
      const { email, password } = values;
      const expiresAt = new Date().getTime() + 1000 * 60 * 60 * 11;
      try {
        const response = await axiosInstance.post("/user/sing-up", {
          email,
          password,
        });
        if (response.status === 201) {
          const response = await axiosInstance.post("/auth/login", {
            email,
            password,
          });
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("expiresAt", expiresAt);
          setRedirectTo("/my-profile");
        } else {
          setError("This email is already registered");
        }
        setIsLoading(false);
      } catch (error) {
        setError("This email is already registered");
        setIsLoading(false);
      }
    },
  });

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Lobbii | Sing Up</title>
        <meta name="description" content="Sing up" />
      </Helmet>
      {error && (
        <Alert className="bg-soft-danger fw-medium main-error-alert">
          <i className="uil uil-info-circle fs-5 align-middle me-1"></i>
          {error}
        </Alert>
      )}
      <section className="singup-container d-flex w-100 ">
        <Container>
          <Row className="align-items-center justify-content-center ">
            <Col className="auth-form" lg={5} md={6}>
              <Card className="shadow border-0 singup-card">
                <CardBody>
                  <div className="card-title text-center">
                    <a href="/login">
                      <img className="auth-logo m-auto" src={logo}></img>
                    </a>
                    <h4 className="m-3">Sing Up</h4>
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
                      <Col md="12">
                        <div className="mb-3" ref={parent}>
                          <Label className="form-label" htmlFor="email">
                            Email <span className="text-danger">*</span>
                          </Label>
                          <div className="form-icon position-relative">
                            <i>
                              <FeatherIcon
                                icon="mail"
                                className="fea icon-sm icons"
                              />
                            </i>
                          </div>
                          <Input
                            type="text"
                            className="form-control ps-5"
                            name="email"
                            id="email"
                            placeholder="email"
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

                      <Col md={12}>
                        <div className="mb-3" ref={parent2}>
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
                            placeholder="password"
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

                      <Col md={12}>
                        <div className="mb-3" ref={parent2}>
                          <Label className="form-label" htmlFor="password">
                            Repeat your password{" "}
                            <span className="text-danger">*</span>
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
                            name="repeatPassword"
                            id="repeatPassword"
                            placeholder="Re enter your password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.repeatPassword || ""}
                            invalid={
                              validation.touched.repeatPassword &&
                              validation.errors.repeatPassword
                                ? true
                                : false
                            }
                          />
                          {validation.touched.repeatPassword &&
                          validation.errors.repeatPassword ? (
                            <FormFeedback type="invalid">
                              {validation.errors.repeatPassword}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col md={12}>
                        <div className="d-grid">
                          <Button
                            color="secondary"
                            type="submit"
                            className="d-flex align-items-center justify-content-center"
                          >
                            {isLoading ? (
                              <Spinner size="sm" className="mx-2"></Spinner>
                            ) : (
                              <i className="bx bx-calendar-plus"></i>
                            )}
                            <p className="m-0">Sing Up</p>
                          </Button>
                        </div>
                      </Col>
                      <div className="mx-auto">
                        <p className="mb-0 mt-4">
                          <small className="text-muted me-1">
                            Already registered?
                          </small>{" "}
                          <Link to="/login" className="text-muted fw-bold">
                            Log in
                          </Link>
                        </p>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};
export default PageSignUp;
