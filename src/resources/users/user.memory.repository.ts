const { getRepository } = require('typeorm');
import UserEntity = require('./user.entity');

const getSafeResponse = async (user) => {
  const { id, name, login } = user;
  return { id, name, login };
};

/** Returns an array of all users as a promise
 * @returns {Promise<object[]>} Array of all stored users
 */
const getAll = async (): Promise<Array<UserEntity | undefined>> => {
  const userRepository = getRepository(UserEntity);
  return userRepository.find();
};

/**
 * Returns user object with given id as a promise
 * @param {string} id User's id
 * @returns {Promise<object>} User data
 */
const getUser = async (id: string): Promise<UserEntity | undefined> => {
  const userRepository = getRepository(UserEntity);
  return userRepository.findOne(id);
}

/**
 * Creates new user object based on the provided object and pushes it to users storage.
 * Returns new user object as a promise.
 * @param {object} userData User data
 * @returns {Promise<object>} Created user's data
 */
const createUser = async (userData): Promise<UserEntity> => {
  const userRepository = getRepository(UserEntity);
  return userRepository.save(userData);
};

/**
 * Finds user object based on the id and updates it in the users storage based on the provided object.
 * Returns updated user object.
 * @param {string} id User's id
 * @param {object} newUserData User data to update
 * @returns {Promise<object>} Updated user data
 */
const updateUser = async (id: string, newUserData: object): Promise<UserEntity | null> => {
  const userRepository = getRepository(UserEntity);
  const userToUpdate = await userRepository.findOne(id);
  if (!userToUpdate) return null;
  return userRepository.save({...userToUpdate, ...newUserData});
};

/**
 * Finds user object based on the id and removes it from users storage.
 * Returns removed user object as a promise.
 * @param {string} id User's id
 * @returns {Promise<object>} Deleted user's data
 */
const deleteUser = async (id: string): Promise<UserEntity | null> => {
  const userRepository = getRepository(UserEntity);
  const userToRemove: UserEntity | undefined = await userRepository.findOne(id);
  if (!userToRemove) return null;
  return userRepository.remove(userToRemove);
};

module.exports = {
  getSafeResponse,
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
