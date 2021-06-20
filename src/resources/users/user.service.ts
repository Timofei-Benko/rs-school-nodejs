const usersRepo = require('./user.memory.repository');
import IUser = require('./user.interface');

const getSafeResponse = async (user): Promise<Function> => usersRepo.getSafeResponse(user);
const getAll = async (): Promise<Function> => usersRepo.getAll();
const getUser = async (id: string): Promise<Function> => usersRepo.getUser(id);
const createUser = async (userData: IUser): Promise<Function> => usersRepo.createUser(userData);
const updateUser = async (id: string, newUserData: IUser): Promise<Function> => usersRepo.updateUser(id, newUserData);
const deleteUser = async (id: string): Promise<Function> => usersRepo.deleteUser(id);

module.exports = {
    getSafeResponse,
    getAll,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
