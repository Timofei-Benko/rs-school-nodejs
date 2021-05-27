const tasksRepo = require('./task.memory.repository');

const getAll = async () => tasksRepo.getAll();
const getTask = async (id) => tasksRepo.getTask(id);
const createTask = async (userData) => tasksRepo.createTask(userData);
const updateTask = async (id, newTaskData) => tasksRepo.updateTask(id, newTaskData);
const deleteTask = async (id) => tasksRepo.deleteTask(id);
const deleteAll = async (id) => tasksRepo.deleteAll(id);
const unassignUser = async (id) => tasksRepo.unassignUser(id);

module.exports = {
    getAll,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    deleteAll,
    unassignUser,
};
