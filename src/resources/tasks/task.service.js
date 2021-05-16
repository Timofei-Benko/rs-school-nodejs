const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();
const getTask = (id) => tasksRepo.getTask(id);
const createTask = (userData) => tasksRepo.createTask(userData);
const updateTask = (id, newTaskData) => tasksRepo.updateTask(id, newTaskData);
const deleteTask = (id) => tasksRepo.deleteTask(id);
const deleteAll = (id) => tasksRepo.deleteAll(id);
const unassignUser = (id) => tasksRepo.unassignUser(id);

module.exports = {
    getAll,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    deleteAll,
    unassignUser,
};
