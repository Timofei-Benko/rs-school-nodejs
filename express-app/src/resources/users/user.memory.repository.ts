const { getRepository } = require('typeorm');
const bcrypt = require('bcrypt');
import UserEntity = require('./user.entity');
const taskService = require('../tasks/task.service');

const getSafeResponse = async (user) => {
  const { id, name, login } = user;
  return { id, name, login };
};

const getAll = async (): Promise<Array<UserEntity | undefined>> => {
  const userRepository = getRepository(UserEntity);
  return userRepository.find();
};

const getUser = async (id: string): Promise<UserEntity | undefined> => {
  const userRepository = getRepository(UserEntity);
  return userRepository.findOne(id);
}

const getUserByFilter = async (filter: Record<string, string>): Promise<boolean> => {
  const userRepository = getRepository(UserEntity);
  return userRepository.findOne({ where: filter });
};

const createUser = async (userData): Promise<UserEntity> => {
  const userRepository = getRepository(UserEntity);
  const passwordHash = bcrypt.hashSync(userData.password, 10)
  return userRepository.save({ ...userData, password: passwordHash });
};

const updateUser = async (id: string, newUserData: object): Promise<UserEntity | null> => {
  const userRepository = getRepository(UserEntity);
  const userToUpdate = await userRepository.findOne(id);
  if (!userToUpdate) return null;
  return userRepository.save({...userToUpdate, ...newUserData});
};

const deleteUser = async (id: string): Promise<UserEntity | null> => {
  const userRepository = getRepository(UserEntity);
  const userToRemove: UserEntity | undefined = await userRepository.findOne(id);
  if (!userToRemove) return null;
  await taskService.unnassignTasksByUserId(id);
  return userRepository.remove(userToRemove);
};

module.exports = {
  getSafeResponse,
  getAll,
  getUser,
  getUserByFilter,
  createUser,
  updateUser,
  deleteUser,
};
