import store from "./store.js";
import { nanoid } from "nanoid";

async function createProduct(newProduct) {
  newProduct.id = nanoid();
  const product = await store.create(newProduct);
  return product;
}

async function getProducts() {
  const products = await store.get();
  return products;
}

async function getProductById(id) {
  const product = await store.getById(id);
  return product;
}

async function deleteProduct(id) {
  await store.delete(id);
}

async function updateProduct(id, productData) {
  await store.update(id, productData);
}

async function getProductsByUserId(userId) {
  const products = await store.getByUserId(userId);
  return products;
}

export default {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  getProductsByUserId,
};
