import express from "express";
import { success } from "../../../network/response.js";
import controller from "./controller.js";
import Product from "../product/controller.js";
import passport from "passport";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const posts = await controller.getPosts();
      success(req, res, posts, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/userPosts",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const posts = await controller.getPostsByUserId(req.user.sub);
      success(req, res, posts, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id", async (req, res, next) => {
  try {
    const post = await controller.getPostById(req.params.id);
    success(req, res, post, 200);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const sub = req.user.sub;
      const newPost = req.body;
      newPost.user_id = sub;
      const post = await controller.createPost(newPost);
      success(req, res, post, 201);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id/product",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const postId = req.params.id;
      req.body.post_id = postId;
      const product = await Product.createProduct(req.body);
      success(req, res, product, 201);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      await controller.deletePost(req.params.id);
      success(req, res, `Post ${req.params.id} has been deleted`, 200);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
