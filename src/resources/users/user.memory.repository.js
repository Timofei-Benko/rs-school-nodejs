const User = require('./user.model');
const { unassignUsers } = require('../tasks/task.service');

const users = [];

const getAll = async () => users;

const getUser = async (id) => users.find(user => user.id === id);

const createUser = async (user) => {
  users.push(new User(user));
  return user
};

const updateUser = async (id, newUserData) => {
  const userIndex = users.findIndex(user => user.id === id);
  const newUser = {...newUserData, id};
  users.splice(userIndex, 1, newUser);
  return newUser;
};

const deleteUser = async (id) => {
  const userToDelete = users.find(user => user.id === id);
  await unassignUsers(id);
  users.splice(users.indexOf(userToDelete), 1);
  return userToDelete;
};

module.exports = {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
