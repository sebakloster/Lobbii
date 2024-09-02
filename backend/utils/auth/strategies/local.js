import { Strategy } from "passport-local";
import Auth from "../../../api/components/auth/controller.js";

const LocalStrategy = new Strategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await Auth.getUser(email, password);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

export default LocalStrategy;
