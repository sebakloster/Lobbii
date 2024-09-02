import User from "./components/user/model.js";
import Post from "./components/post/model.js";
import Product from "./components/product/model.js";

User.hasMany(Post, { foreignKey: "user_id", allowNull: false });
Post.belongsTo(User, { foreignKey: "user_id", allowNull: false });

Post.hasMany(Product, { foreignKey: "post_id", allowNull: false });
Product.belongsTo(Post, { foreignKey: "post_id", allowNull: false });
