import React, { useEffect, useState } from "react";
import "../../assets/css/myProfile.css";

import tiktokIcon from "../../assets/images/tiktok-logo.png";
import youtubeIcon from "../../assets/images/youtube-logo.png";
import xIcon from "../../assets/images/x-logo.png";

import axiosInstance from "../../helpers/axiosConfig.js";
import { useHistory } from "react-router-dom";
import { Button, Spinner } from "reactstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";

const MyProfile = () => {
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [userDataLoading, setUserDataLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/user/userData");
        if (response.status === 200) {
          setUserData(response.data.body);
        }
      } catch (error) {
        console.error(error);
      }
      setUserDataLoading(false);
    };
    const fetchUserPosts = async () => {
      try {
        const response = await axiosInstance.get("/post/userPosts");
        if (response.status === 200) {
          setUserPosts(response.data.body);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserProducts = async () => {
      try {
        const response = await axiosInstance.get("/product/myProducts");
        if (response.status === 200) {
          setUserProducts(response.data.body);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
    fetchUserPosts();
    fetchUserProducts();
  }, []);

  const handleRedirect = (postId) => {
    history.push(`/new-product/${postId}`);
  };

  return (
    <>
      {userDataLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner color="secondary mt-5 p-5" />
        </div>
      ) : (
        <section className="my-profile-container">
          {!userData.yt_username &&
          !userData.tw_username &&
          !userData.tiktok_username ? (
            <div className="no-profile d-flex flex-column mx-auto w-50 mt-5 p-5">
              <h5 className="text-center">
                You haven't connected any social media accounts yet
              </h5>
              <p className="text-center text-secondary">
                Link at least one social media account to create your profile
              </p>
              <Link
                to="/connect-social-media"
                className="btn btn-success w-50 mx-auto mt-2"
              >
                Connect Social Media
              </Link>
            </div>
          ) : (
            <>
              {" "}
              <div className="my-profile-header">
                <div
                  className="my-profile-info"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(${userData.banner_picture_url})`,
                  }}
                >
                  <div className="info-avatar">
                    <img
                      className="rounded-circle"
                      height={140}
                      src={userData.profile_picture_url}
                      alt="avatar"
                    />
                  </div>
                  <div className="info-details">
                    <h3 className="my-1">
                      {userData.yt_username ||
                        userData.tw_username ||
                        userData.tiktok_username}
                    </h3>

                    <div className="info-socials ">
                      <a
                        href={`https://www.x.com/${userData?.x_username || ""}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={xIcon}
                          alt="x"
                          height={23}
                          style={{ marginRight: "0.5rem" }}
                        />
                      </a>

                      <a
                        href={`https://www.youtube.com/${
                          userData?.yt_username || ""
                        }`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={youtubeIcon}
                          alt="youtube"
                          height={23}
                          style={{ marginRight: "0.5rem" }}
                        />
                      </a>
                      <a
                        href={`https://www.tiktok.com/@${
                          userData?.tiktok_username || ""
                        }`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={tiktokIcon} alt="tiktok" height={23} />
                      </a>
                    </div>
                    <p className="mt-2">
                      {userData.profile_description?.length > 70
                        ? `${userData.profile_description.slice(0, 70)}...`
                        : userData.profile_description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="latest-posts">
                {/* <h5 className="mx-3">Latest Posts</h5> */}
                <div className="posts-container">
                  {userPosts.slice(-3).map((post) => (
                    <div className="post" key={post.id}>
                      <div className="post-inner">
                        <div className="post-front">
                          <div className="image-container">
                            <p className="image-social">
                              {post.social_media_platform}
                            </p>
                            <img
                              src={
                                post.image_url ||
                                "https://variety.com/wp-content/uploads/2023/08/X-Logo-Twitter.png?w=681&h=383&crop=1"
                              }
                              alt="post"
                            />
                            <p className="image-text">
                              {post.description.length > 40
                                ? `${post.description.slice(0, 40)}...`
                                : post.description}
                            </p>
                          </div>
                        </div>
                        <div className="post-back">
                          <Button
                            className="btn btn-success"
                            onClick={() => handleRedirect(post.id)}
                          >
                            Highlight Product in this post
                          </Button>
                          <a
                            className="btn btn-secondary mt-2"
                            href={post.external_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Post
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="products-section">
                <h5 className="mx-5 mt-3">Products</h5>
                {userProducts.length === 0 ? (
                  <div className="no-products d-flex flex-column mx-5">
                    <p className=" text-secondary mt-3">
                      You haven't added any products yet
                    </p>
                  </div>
                ) : (
                  <div
                    className="products-container"
                    style={{ paddingLeft: "2rem" }}
                  >
                    {userProducts.map((product) => (
                      <div className="product-card mx-2" key={product.id}>
                        <div className="product-details">
                          <img
                            className="rounded"
                            height={75}
                            width={75}
                            style={{ objectFit: "cover" }}
                            src={product.image_url}
                            alt="product image"
                          />
                          <p className="mt-3">${product.price.toFixed(2)}</p>
                          <p className="text-muted">{product.name}</p>
                        </div>
                        <div className="product-icons">
                          <i className="bx bxs-t-shirt m-3"></i>
                          <a
                            href={product.external_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="bx bx-link-external m-3"></i>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
};

export default MyProfile;
