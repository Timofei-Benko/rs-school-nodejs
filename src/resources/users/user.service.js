const usersRepo = require('./user.memory.repository');

const getAll = async () => usersRepo.getAll();
const getUser = async (id) => usersRepo.getUser(id);
const createUser = async (userData) => usersRepo.createUser(userData);
const updateUser = async (id, newUserData) => usersRepo.updateUser(id, newUserData);
const deleteUser = async (id) => usersRepo.deleteUser(id);

module.exports = {
    getAll,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
