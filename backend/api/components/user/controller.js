import store from "./store.js";
import { nanoid } from "nanoid";

async function createUser(newUser) {
  newUser.id = await nanoid();
  const user = await store.create(newUser);
  return user;
}

async function getUsers() {
  const users = await store.get();
  const usersToReturn = users.map(({ dataValues: { id, email } }) => ({
    id,
    email,
  }));
  return usersToReturn;
}

async function getUserByEmail(email) {
  const user = await store.getByEmail(email);
  return user;
}

async function deleteUser(email) {
  await store.delete(email);
}

async function updateUser(id, userData) {
  await store.update(id, userData);
}

async function getUserById(id) {
  const user = await store.getById(id);
  return user;
}

export default {
  createUser,
  getUserByEmail,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
};
