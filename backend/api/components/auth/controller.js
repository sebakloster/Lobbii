import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { server as serverConfig } from "../../../config.js";
import { client as clientConfig } from "../../../config.js";
import User from "../user/store.js";
import err from "../../../utils/error.js";

async function getUser(email, password) {
  const user = await User.getByEmail(email);
  if (!user) {
    throw err("User not found", 404);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw err("Invalid password", 401);
  }
  delete user.dataValues.password;
  return user;
}


function signToken(user) {
  const payload = {
    sub: user.id,
    role: user.role,
  };
  const token = jwt.sign(payload, serverConfig.jwtSecret, {
    expiresIn: "12h",
  });
  delete user.dataValues.recoveryToken;
  return {
    user,
    token,
  };
}


export default {
  getUser,
  signToken,
};
