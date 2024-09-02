import { Strategy, ExtractJwt } from "passport-jwt";
import { server as serverConfig } from "../../../config.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: serverConfig.jwtSecret,
};

const JwtStrategy = new Strategy(options, async (payload, done) => {
  const currentTime = Math.floor(Date.now() / 1000);
  if (payload.exp < currentTime) {
    return done(null, false, { message: "Token has expired" });
  }
  return done(null, payload);
});

export default JwtStrategy;
