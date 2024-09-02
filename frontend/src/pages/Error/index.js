import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom"; // Import Link if using React Router

const NotFoundPage = () => {
  return (
    <Container className="text-center my-5">
      <Row>
        <Col>
          <h1 className="display-1">404</h1>
          <h2 className="my-4">Page Not Found</h2>
          <p>
            The page you are looking for might have been removed or is
            temporarily unavailable.
          </p>
          <Link to="/login">
            {" "}
            <Button color="secondary">Go to Homepage</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
