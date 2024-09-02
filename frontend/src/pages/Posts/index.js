import React, { useState, useEffect } from "react";
import "../../assets/css/myProfile.css";
import axiosInstance from "../../helpers/axiosConfig.js";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const Posts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const history = useHistory();

  useEffect(() => {
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

    fetchUserPosts();
  }, []);

  const handleRedirect = (postId) => {
    history.push(`/new-product/${postId}`);
  };

  return (
    <section className="posts-section">
      <h4 className="m-4 text-secondary w-100 text-center">My Posts</h4>
      {userPosts.length === 0 && (
        <p className="text-center text-secondary">
          You have not created any posts yet
        </p>
      )}
      <div className="posts-container posts-grid">
        {userPosts.map((post) => (
          <div className="post" key={post.id}>
            <div className="post-inner">
              <div className="post-front">
                <div className="image-container">
                  <p className="image-social">{post.social_media_platform}</p>
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
    </section>
  );
};

export default Posts;
