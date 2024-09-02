import Model from "./model.js";
import Post from "../post/model.js";
import User from "../user/model.js";

async function createProduct(newProduct) {
  const product = await Model.create(newProduct);
  return product;
}

async function getProducts() {
  const products = await Model.findAll();
  return products;
}

async function getProductById(id) {
  const product = await Model.findOne({
    where: { id },
  });
  return product;
}

async function deleteProduct(id) {
  await Model.destroy({
    where: { id },
  });
}

async function updateProduct(id, productData) {
  const productToUpdate = await Model.findOne({
    where: { id },
  });
  if (productToUpdate) {
    await productToUpdate.update(productData);
  }
}

// a product has a post_id, and a post has a user_id

async function getProductsByUserId(userId) {
  const user = await User.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const posts = await Post.findAll({
    where: { user_id: userId },
  });

  const postIds = posts.map((post) => post.id);

  const products = await Model.findAll({
    where: {
      post_id: postIds,
    },
  });

  return products;
}

export default {
  create: createProduct,
  get: getProducts,
  delete: deleteProduct,
  update: updateProduct,
  getById: getProductById,
  getByUserId: getProductsByUserId,
};
