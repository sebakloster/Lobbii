import Model from "./model.js";

async function createUser(newUser) {
  const user = await Model.create(newUser);
  return user;
}

async function getUsers() {
  const users = await Model.findAll();
  return users;
}

async function getUserByEmail(email) {
  const user = await Model.findOne({
    where: { email },
  });
  return user;
}

async function getUserById(id) {
  const user = await Model.findOne({
    where: { id },
  });
  return user;
}

async function deleteUser(email) {
  await Model.destroy({
    where: { email },
  });
}

async function updateUser(id, userData) {
  const userToUpdate = await Model.findOne({
    where: { id },
  });
  if (userToUpdate) {
    await userToUpdate.update(userData);
  }
}

export default {
  create: createUser,
  get: getUsers,
  getByEmail: getUserByEmail,
  delete: deleteUser,
  update: updateUser,
  getById: getUserById,
};
