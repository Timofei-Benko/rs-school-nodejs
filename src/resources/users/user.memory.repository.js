const User = require('./user.model');
const { unassignUsers } = require('../tasks/task.service');

const users = [];

/** Returns an array of all users as a promise
 * @returns {Promise<object[]>} Array of all stored users
 */
const getAll = async () => users;

/**
 * Returns user object with given id as a promise
 * @param {string} id User's id
 * @returns {Promise<object>} Object with user data
 */
const getUser = async (id) => users.find(user => user.id === id);

/**
 * Creates new user object based on the provided object and pushes it to users storage.
 * Returns new user object as a promise.
 * @param {object} user User data
 * @returns {Promise<object>} Object with created user's data
 */
const createUser = async (user) => {
  users.push(new User(user));
  return user
};

/**
 * Finds user object based on the id and updates it in the users storage based on the provided object.
 * Returns updated user object.
 * @param {string} id User's id
 * @param {object} newUserData User data to update from request
 * @returns {Promise<object>} Object with updated user data
 */
const updateUser = async (id, newUserData) => {
  const userIndex = users.findIndex(user => user.id === id);
  const updatedUser = {...newUserData, id};
  users.splice(userIndex, 1, updatedUser);
  return updatedUser;
};

/**
 * Finds user object based on the id and removes it from users storage.
 * Returns removed user object as a promise.
 * @param {string} id User's id
 * @returns {Promise<object>} Object with deleted user's data
 */
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
