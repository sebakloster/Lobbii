import user from "../api/components/user/network.js";
import auth from "../api/components/auth/network.js";
import post from "../api/components/post/network.js";
import product from "../api/components/product/network.js";

const routes = function (server) {
  server.use("/user", user);
  server.use("/auth", auth);
  server.use("/post", post);
  server.use("/product", product);
};

export default routes;
