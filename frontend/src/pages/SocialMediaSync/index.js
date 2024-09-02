import React, { useState } from "react";
import {
  Button,
  Input,
  Spinner,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Alert,
} from "reactstrap";

import tiktokIcon from "../../assets/images/tiktok-logo.png";
import youtubeIcon from "../../assets/images/youtube-logo.png";
import xIcon from "../../assets/images/x-logo.png";

import "../../assets/css/socialMediaSync.css";

import apifyClient from "../../helpers/apifyClient.js";
import axiosInstance from "../../helpers/axiosConfig.js";

const SocialMediaSync = () => {
  // Fetching states
  const [youtubeFetching, setyoutubeFetching] = useState(false);
  const [xFetching, setXFetching] = useState(false);
  const [tiktokFetching, setTiktokFetching] = useState(false);

  // Input states
  const [YTUsername, setYTUsername] = useState("");
  const [xUsername, setXUsername] = useState("");
  const [tiktokUsername, setTiktokUsername] = useState("");

  // Error state
  const [error, setError] = useState("");

  //Success state
  const [success, setSuccess] = useState("");

  // Fetch functions
  const fetchYTPosts = async () => {
    if (!YTUsername.trim()) {
      setError("Please enter an Youtube username.");
      return;
    }
    setError(""); // Clear any existing errors
    setyoutubeFetching(true);
    const input = {
      maxResultStreams: 0,
      maxResults: 3,
      maxResultsShorts: 0,
      startUrls: [
        {
          url: `https://www.youtube.com/@${YTUsername}/`,
        },
      ],
    };

    try {
      const run = await apifyClient.actor("67Q6fmd8iedTVcCwY").call(input);
      if (run.status == "SUCCEEDED") {
        const { items } = await apifyClient
          .dataset(run.defaultDatasetId)
          .listItems();
        populateYoutubePosts(items);
      } else {
        throw new Error("Failed to fetch Youtube posts.");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch Youtube posts.");
    }
    setyoutubeFetching(false);
  };

  const fetchXPosts = async () => {
    if (!xUsername.trim()) {
      setError("Please enter a X username.");
      return;
    }
    setError("");
    setXFetching(true);

    const input = {
      addUserInfo: true,
      handles: [xUsername],
      proxyConfig: {
        useApifyProxy: true,
      },
      tweetsDesired: 3,
    };

    try {
      const run = await apifyClient.actor("u6ppkMWAx2E2MpEuF").call(input);

      if (run.status == "SUCCEEDED") {
        const { items } = await apifyClient
          .dataset(run.defaultDatasetId)
          .listItems();
        populateXPosts(items);
      } else {
        throw new Error("Failed to fetch X posts.");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch X posts.");
    }

    setXFetching(false);
  };

  const fetchTikTokPosts = async () => {
    if (!tiktokUsername.trim()) {
      setError("Please enter a TikTok username.");
      return;
    }
    setError(""); // Clear any existing errors
    setTiktokFetching(true);

    const input = {
      excludePinnedPosts: false,
      profiles: [tiktokUsername],
      resultsPerPage: 3,
      shouldDownloadCovers: false,
      shouldDownloadSlideshowImages: false,
      shouldDownloadSubtitles: false,
      shouldDownloadVideos: false,
    };

    try {
      const run = await apifyClient.actor("0FXVyOXXEmdGcV88a").call(input);

      if (run.status == "SUCCEEDED") {
        const { items } = await apifyClient
          .dataset(run.defaultDatasetId)
          .listItems();
        populateTikTokPosts(items);
      } else {
        throw new Error("Failed to fetch TikTok posts.");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch TikTok posts.");
    }
    setTiktokFetching(false);
  };

  const populateYoutubePosts = async (youtubePosts) => {
    if (!youtubePosts.length) {
      return;
    }
    let userInfo = {};
    for (let post of youtubePosts) {
      const {
        id,
        title,
        thumbnailUrl,
        url,
        channelAvatarUrl,
        channelBannerUrl,
        channelDescription,
      } = post;
      try {
        const response = await axiosInstance.post("/post", {
          id,
          social_media_platform: "Youtube",
          description: title,
          external_link: url,
          image_url: thumbnailUrl,
        });
        userInfo = {
          yt_username: YTUsername,
          profile_banner_url: channelBannerUrl,
          profile_picture_url: channelAvatarUrl,
          profile_description: channelDescription,
        };
        if (response.status === 201) {
          console.log("Youtube post added successfully.");
        } else {
          throw new Error("Failed to add Youtube post.");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to add Youtube post.");
        return;
      }
      setSuccess("Youtube posts added successfully to your account.");
    }
    await updateUser(userInfo);
  };

  const populateTikTokPosts = async (tiktokPosts) => {
    if (!tiktokPosts.length) {
      return;
    }
    let userInfo = {};
    for (let post of tiktokPosts) {
      const { id, text, videoMeta, webVideoUrl, authorMeta } = post;
      try {
        const response = await axiosInstance.post("/post", {
          id,
          social_media_platform: "TikTok",
          description: text,
          external_link: webVideoUrl,
          image_url: videoMeta.coverUrl,
        });
        userInfo = {
          tiktok_username: tiktokUsername,
          profile_picture_url: authorMeta.avatar,
          profile_description: authorMeta.bioLink,
        };
        if (response.status === 201) {
          console.log("TikTok post added successfully.");
        } else {
          throw new Error("Failed to add TikTok post.");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to add TikTok post.");
        return;
      }
      setSuccess("TikTok posts added successfully to your account.");
    }
    await updateUser(userInfo);
  };

  const populateXPosts = async (xPosts) => {
    if (!xPosts.length) {
      return;
    }
    let userInfo = {};
    for (let post of xPosts) {
      const { id, full_text, url, media, user } = post;
      try {
        const response = await axiosInstance.post("/post", {
          id,
          social_media_platform: "X",
          description: full_text,
          external_link: url,
          image_url: media[0]?.media_url || "",
        });
        userInfo = {
          tw_username: xUsername,
          profile_picture_url: user.profile_image_url_https,
          banner_picture_url: user.profile_banner_url,
        };
        if (response.status === 201) {
          console.log("X post added successfully.");
        } else {
          throw new Error("Failed to add X post.");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to add X post.");
        return;
      }
      setSuccess("X posts added successfully to your account.");
    }
    await updateUser(userInfo);
  };

  async function updateUser(userInfo) {
    try {
      if (!userInfo) {
        console.log("No user info to update.");
        return;
      }
      const response = await axiosInstance.patch("/user", userInfo);
      if (response.status === 200) {
        console.log("User updated successfully.");
      } else {
        throw new Error("Failed to update user.");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to update user.");
    }
  }

  return (
    <section
      className="media-sync-container"
      style={{
        display: "flex",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <h3 className="text-secondary mt-5 mb-3">
        Connect your social media accounts
      </h3>
      <div
        className="cards-container"
        style={{ display: "flex", flexDirection: "row", gap: "2rem" }}
      >
        {/* Error Alert */}
        {error && (
          <Alert className="bg-soft-danger fw-medium main-error-alert">
            <i className="uil uil-info-circle fs-5 align-middle me-1"></i>
            {error}
          </Alert>
        )}
        {/* Success Alert */}
        {success && (
          <Alert className="bg-soft-success fw-medium main-error-alert">
            <i className="uil uil-info-circle fs-5 align-middle me-1"></i>
            {success}
          </Alert>
        )}

        {/* Youtube Card */}
        <Card className="media-sync-card" style={{ textAlign: "center" }}>
          <CardImg
            top
            src={youtubeIcon}
            alt="Youtube Logo"
            style={{ width: "3rem", margin: "auto" }}
          />
          <CardBody>
            <CardTitle>Youtube</CardTitle>
            <Input
              type="text"
              placeholder="Enter YT username"
              value={YTUsername}
              onChange={(e) => setYTUsername(e.target.value)}
            />
            <Button
              onClick={fetchYTPosts}
              disabled={youtubeFetching}
              style={{ marginTop: "1rem" }}
            >
              {youtubeFetching ? <Spinner size="sm" /> : "Fetch YT Videos"}
            </Button>
          </CardBody>
        </Card>

        {/* X (formerly Twitter) Card */}
        <Card className="media-sync-card" style={{ textAlign: "center" }}>
          <CardImg
            top
            src={xIcon}
            alt="X Logo"
            style={{ width: "3rem", margin: "auto" }}
          />
          <CardBody>
            <CardTitle>X</CardTitle>
            <Input
              type="text"
              placeholder="Enter X username"
              value={xUsername}
              onChange={(e) => setXUsername(e.target.value)}
            />
            <Button
              onClick={fetchXPosts}
              disabled={xFetching}
              style={{ marginTop: "1rem" }}
            >
              {xFetching ? <Spinner size="sm" /> : "Fetch X Posts"}
            </Button>
          </CardBody>
        </Card>

        {/* TikTok Card */}
        <Card className="media-sync-card" style={{ textAlign: "center" }}>
          <CardImg
            top
            src={tiktokIcon}
            alt="TikTok Logo"
            style={{ width: "3rem", margin: "auto" }}
          />
          <CardBody>
            <CardTitle>TikTok</CardTitle>
            <Input
              type="text"
              placeholder="Enter TikTok username"
              value={tiktokUsername}
              onChange={(e) => setTiktokUsername(e.target.value)}
            />
            <Button
              onClick={fetchTikTokPosts}
              disabled={tiktokFetching}
              style={{ marginTop: "1rem" }}
            >
              {tiktokFetching ? <Spinner size="sm" /> : "Fetch TikTok Posts"}
            </Button>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};

export default SocialMediaSync;
