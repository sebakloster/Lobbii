import Model from "./model.js";

async function createPost(newPost) {
  // Check if the post with the same id already exists
  const existingPost = await Model.findOne({
    where: { id: newPost.id },
  });

  // If the post exists, return a message or throw an error
  if (existingPost) {
    return;
  }

  // If the post does not exist, create a new post
  const post = await Model.create(newPost);
  return post;
}

async function getPosts() {
  const posts = await Model.findAll();
  return posts;
}

async function getPostById(id) {
  const post = await Model.findOne({
    where: { id },
  });
  return post;
}

async function deletePost(id) {
  await Model.destroy({
    where: { id },
  });
}

async function updatePost(id, postData) {
  const postToUpdate = await Model.findOne({
    where: { id },
  });
  if (postToUpdate) {
    await postToUpdate.update(postData);
  }
}

async function getPostsByUserId(userId) {
  const posts = await Model.findAll({
    where: {
      user_id: userId,
    },
  });
  return posts;
}

export default {
  create: createPost,
  get: getPosts,
  delete: deletePost,
  update: updatePost,
  getById: getPostById,
  getByUserId: getPostsByUserId,
};
