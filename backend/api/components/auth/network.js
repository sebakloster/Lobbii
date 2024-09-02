import express from "express";
import Auth from "./controller.js";
import passport from "passport";

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(Auth.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

export default router;
