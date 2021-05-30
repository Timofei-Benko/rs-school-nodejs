const User = require('./user.model');
const { unassignUsers } = require('../tasks/task.service');
import IUser = require('./user.interface');

const users: Array<IUser | undefined> = [];

/** Returns an array of all users as a promise
 * @returns {Promise<object[]>} Array of all stored users
 */
const getAll = async (): Promise<Array<IUser | undefined>> => users;

/**
 * Returns user object with given id as a promise
 * @param {string} id User's id
 * @returns {Promise<object>} User data
 */
const getUser = async (id: string): Promise<IUser | undefined> => users.find(user => user?.id === id);

/**
 * Creates new user object based on the provided object and pushes it to users storage.
 * Returns new user object as a promise.
 * @param {object} user User data
 * @returns {Promise<object>} Created user's data
 */
const createUser = async (user: IUser): Promise<IUser> => {
  users.push(new User(user));
  return user
};

/**
 * Finds user object based on the id and updates it in the users storage based on the provided object.
 * Returns updated user object.
 * @param {string} id User's id
 * @param {object} newUserData User data to update
 * @returns {Promise<object>} Updated user data
 */
const updateUser = async (id: string, newUserData: object): Promise<IUser> => {
  const userIndex: number = users.findIndex(user => user?.id === id);
  const updatedUser: IUser = {...newUserData, id};
  users.splice(userIndex, 1, updatedUser);
  return updatedUser;
};

/**
 * Finds user object based on the id and removes it from users storage.
 * Returns removed user object as a promise.
 * @param {string} id User's id
 * @returns {Promise<object>} Deleted user's data
 */
const deleteUser = async (id: string): Promise<IUser | undefined> => {
  const userToDelete: IUser | undefined = users.find(user => user?.id === id);
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
