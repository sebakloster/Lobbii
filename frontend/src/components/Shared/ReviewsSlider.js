import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import StarRatings from "react-star-ratings";

import lottie from "lottie-web";

import img1 from "../../assets/images/client/01.json";
import img2 from "../../assets/images/client/02.json";

class ReviewsSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: 4,
      step1: true,
      step2: false,
    };
    this.updateWindowSize.bind(this);
    this.animationInstances = [];
  }

  updateWindowSize = () => {
    if (window.outerWidth >= 1230) {
      this.setState({ itemCount: 3, cols: 4 });
    } else if (window.outerWidth >= 970 && window.outerWidth < 1230) {
      this.setState({ itemCount: 3, cols: 4 });
    } else if (window.outerWidth <= 970) {
      this.setState({ itemCount: 1, cols: 12 });
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowSize);
    this.updateWindowSize();
    this.loadAnimations();
  }

  componentWillUnmount() {
    this.animationInstances.forEach((instance) => instance.destroy());
    this.animationInstances = [];
  }

  componentDidUpdate() {
    this.loadAnimations();
  }

  loadAnimations() {
    const menElements = document.querySelectorAll('[id^="men-animation"]');
    const womenElements = document.querySelectorAll('[id^="women-animation"]');

    this.animationInstances.forEach((instance) => instance.destroy());
    this.animationInstances = [];

    menElements.forEach((men) => {
      const instance = lottie.loadAnimation({
        container: men,
        animationData: img2,
      });
      this.animationInstances.push(instance);
    });

    womenElements.forEach((women) => {
      const instance = lottie.loadAnimation({
        container: women,
        animationData: img1,
      });
      this.animationInstances.push(instance);
    });
  }

  // Make sure to remove the DOM listener when the component is unmounted.
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowSize);
  }
  render() {
    return (
      <React.Fragment>
        <Row className="justify-content-center">
          <Col lg="12" className="mt-4 mb-1">
            <div id="customer-testi" className="tiny-three-item">
              <div className="tiny-slide">
                <Row>
                  {this.state.step1 === true
                    ? this.props.reviews.map((review, key) =>
                        key >= 0 && key <= 2 ? (
                          <Col key={key} md={this.state.cols} className="mb-1">
                            <div
                              className="d-flex client-testi"
                              name="clientsreview"
                            >
                              <div
                                id={review.img}
                                style={{ height: 65, width: 65 }}
                                className="avatar avatar-small client-image rounded shadow"
                                alt=""
                              />
                              <div className="flex-1 content p-3 shadow rounded bg-white position-relative">
                                <StarRatings
                                  items={3}
                                  rating={review.rating}
                                  starRatedColor="#F17425"
                                  numberOfStars={5}
                                  name="rating"
                                  starDimension="15px"
                                  starSpacing="3px"
                                />
                                <p className="text-muted mt-2">{review.desc}</p>
                                <h6 className="text-primary">
                                  - {review.name}{" "}
                                  <small className="text-muted">
                                    {review.post}
                                  </small>
                                </h6>
                              </div>
                            </div>
                          </Col>
                        ) : null
                      )
                    : this.props.reviews.map((review, key) =>
                        key >= 3 && key <= 5 ? (
                          <Col key={key} md={this.state.cols} className="mb-1">
                            <div
                              className="d-flex client-testi"
                              name="clientsreview"
                            >
                              <div
                                id={review.img}
                                style={{ height: 65, width: 65 }}
                                className="avatar avatar-small client-image rounded shadow"
                                alt=""
                              />
                              <div className="flex-1 content p-3 shadow rounded bg-white position-relative">
                                <StarRatings
                                  items={3}
                                  rating={review.rating}
                                  starRatedColor="#F17425"
                                  numberOfStars={5}
                                  name="rating"
                                  starDimension="15px"
                                  starSpacing="3px"
                                  className="mb-0"
                                />
                                <p className="text-muted mt-2">{review.desc}</p>
                                <h6 className="text-primary">
                                  - {review.name}{" "}
                                  <small className="text-muted">
                                    {review.post}
                                  </small>
                                </h6>
                              </div>
                            </div>
                          </Col>
                        ) : null
                      )}
                </Row>
              </div>
            </div>
            <div className="tns-nav">
              <button
                type="button"
                onClick={() => {
                  this.setState({ step1: true, step2: false });
                }}
                className={
                  this.state.step1 ? "tns-nav-active" : "tns-nav-inactive"
                }
                aria-label="Go to slide 1"
              ></button>
              <button
                type="button"
                onClick={() => {
                  this.setState({ step1: false, step2: true });
                }}
                className={
                  this.state.step2 ? "tns-nav-active" : "tns-nav-inactive"
                }
                aria-label="Go to slide 2"
              ></button>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default ReviewsSlider;
