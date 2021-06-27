const tasksRepo = require('./task.memory.repository');
import ITask = require('./task.interface');

const getAll = async (): Promise<Function> => tasksRepo.getAll();
const getTask = async (id: string): Promise<Function> => tasksRepo.getTask(id);
const createTask = async (taskData: ITask): Promise<Function> => tasksRepo.createTask(taskData);
const updateTask = async (newTaskData: ITask, id: string): Promise<Function> => tasksRepo.updateTask(newTaskData, id);
const deleteTask = async (id: string): Promise<Function> => tasksRepo.deleteTask(id);
const deleteTasksByBoardId = async (boardId: string): Promise<Function> => tasksRepo.deleteTasksByBoardId(boardId);
const unnassignTasksByUserId = async (userId: string): Promise<Function> => tasksRepo.unnassignTasksByUserId(userId);

module.exports = {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  deleteTasksByBoardId,
  unnassignTasksByUserId
};
