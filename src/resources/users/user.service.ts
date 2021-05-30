const usersRepo = require('./user.memory.repository');

const getAll = async (): Promise<Function> => usersRepo.getAll();
const getUser = async (id: string): Promise<Function> => usersRepo.getUser(id);
const createUser = async (userData: object): Promise<Function> => usersRepo.createUser(userData);
const updateUser = async (id: string, newUserData: object): Promise<Function> => usersRepo.updateUser(id, newUserData);
const deleteUser = async (id: string): Promise<Function> => usersRepo.deleteUser(id);

module.exports = {
    getAll,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
