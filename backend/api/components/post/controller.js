import store from "./store.js";

async function createPost(newPost) {
  const post = await store.create(newPost);
  return post;
}

async function getPosts() {
  const posts = await store.get();
  return posts;
}

async function getPostById(id) {
  const post = await store.getById(id);
  return post;
}

async function deletePost(id) {
  await store.delete(id);
}

async function updatePost(id, postData) {
  await store.update(id, postData);
}

async function getPostsByUserId(userId) {
  const posts = await store.getByUserId(userId);
  return posts;
}

export default {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  updatePost,
  getPostsByUserId,
};
