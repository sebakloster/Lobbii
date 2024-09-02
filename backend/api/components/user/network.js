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
      const users = await controller.getUsers();
      success(req, res, users, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/userData",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const sub = req.user.sub;
      const user = await controller.getUserById(sub);
      success(req, res, user, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/sing-up", async (req, res, next) => {
  try {
    const user = await controller.createUser(req.body);
    success(req, res, user, 201);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const sub = req.user.sub;
      const user = await controller.updateUser(sub, req.body);
      success(req, res, user, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:email",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      await controller.deleteUser(req.params.email);
      success(req, res, `User ${req.params.email} has been deleted`, 200);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
