import React from "react";
import { Redirect } from "react-router-dom";

import Login from "../pages/AuthPages/PageLogin";
import Register from "../pages/AuthPages/PageSingup";
import Error from "../pages/Error";
import MyProfile from "../pages/MyProfile";
import SocialMediaSync from "../pages/SocialMediaSync";
import Posts from "../pages/Posts";
import CreateProduct from "../pages/CreateProduct";
import Products from "../pages/Products";

const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/my-profile", component: MyProfile, isWithHubLayout: true },
  { path: "/posts", component: Posts, isWithHubLayout: true },
  { path: "/products", component: Products, isWithHubLayout: true },
  {
    path: "/new-product/:postId",
    component: CreateProduct,
    isWithHubLayout: true,
  },
  {
    path: "/connect-social-media",
    component: SocialMediaSync,
    isWithHubLayout: true,
  },
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/login" />,
  },
  {
    path: "/*",
    component: Error,
    isWithoutLayout: true,
  },
];

export default routes;
