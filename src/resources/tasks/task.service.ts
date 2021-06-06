const tasksRepo = require('./task.memory.repository');
import ITask = require('./task.interface');

const getAll = async (): Promise<Function> => tasksRepo.getAll();
const getTask = async (id: string): Promise<Function> => tasksRepo.getTask(id);
const createTask = async (taskData: ITask, boardId: string): Promise<Function> => tasksRepo.createTask(taskData, boardId);
const updateTask = async (newTaskData: ITask, id: string): Promise<Function> => tasksRepo.updateTask(newTaskData, id);
const deleteTask = async (id: string): Promise<Function> => tasksRepo.deleteTask(id);
const deleteAllTasks = async (id: string): Promise<Function> => tasksRepo.deleteAllTasks(id);
const unassignUsers = async (userId: string): Promise<Function> => tasksRepo.unassignUsers(userId);

module.exports = {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  unassignUsers
};
