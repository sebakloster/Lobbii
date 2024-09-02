import express from "express";
import { success } from "../../../network/response.js";
import controller from "./controller.js";
import passport from "passport";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const products = await controller.getProducts();
      success(req, res, products, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/myProducts",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const sub = req.user.sub;
      const products = await controller.getProductsByUserId(sub);
      success(req, res, products, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const product = await controller.getProductById(req.params.id);
      success(req, res, product, 200);
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
      await controller.deleteProduct(req.params.id);
      success(req, res, `Product ${req.params.id} has been deleted`, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      await controller.updateProduct(req.params.id, req.body);
      success(req, res, `Product ${req.params.id} has been updated`, 200);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
