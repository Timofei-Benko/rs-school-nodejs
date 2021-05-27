const tasksRepo = require('./task.memory.repository');

const getAll = async () => tasksRepo.getAll();
const getTask = async (id) => tasksRepo.getTask(id);
const createTask = async (taskData, boardId) => tasksRepo.createTask(taskData, boardId);
const updateTask = async (newTaskData, id) => tasksRepo.updateTask(newTaskData, id);
const deleteTask = async (id) => tasksRepo.deleteTask(id);
const deleteAllTasks = async (id) => tasksRepo.deleteAllTasks(id);
const unassignUsers = async (userId) => tasksRepo.unassignUsers(userId);

module.exports = {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  unassignUsers
};
