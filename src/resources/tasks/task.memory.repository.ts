const { getRepository } = require('typeorm');
import TaskEntity = require('./task.entity');

/**
 * Returns all tasks from the tasks storage in an array as a promise.
 * @returns {Promise<object[]>}
 */
const getAll = async (): Promise<Array<TaskEntity | undefined>> => {
  const taskRepository = getRepository(TaskEntity);
  return taskRepository.find();
};

/**
 * Finds a task object based on the given id and returns it as a promise.
 * @param {string} id Task id
 * @returns {Promise<object>}
 */
const getTask = async (id: string): Promise<TaskEntity | undefined> => {
  const taskRepository = getRepository(TaskEntity);
  return taskRepository.findOne(id);
};

/**
 * Creates new task object based on the provided object, assigns it provided board id
 * and pushes the task object to task storage.
 * Returns new task object as a promise.
 * @param {object} taskData Task data
 * @param {string} boardId Id of the board the task is assigned to
 * @returns {Promise<object>} Created task's data
 */
const createTask = async (taskData): Promise<TaskEntity> => {
  const taskRepository = getRepository(TaskEntity);
  return taskRepository.save(taskData);
};

/**
 * Gets task object based on the id,
 * creates a new task object based on the provided newTaskData object
 * and copies it to the original task object.
 * Returns updated task object as a promise.
 * @param {object} newTaskData Task data to update
 * @param {string} id task id
 * @returns {Promise<object>} Updated task's data
 */
const updateTask = async (newTaskData, id: string): Promise<TaskEntity | null> => {
  const taskRepository = getRepository(TaskEntity);
  const task: TaskEntity | undefined = await taskRepository.findOne(id);
  if (!task) return null;
  return taskRepository.save({...task, ...newTaskData});
};

/**
 * Finds task object based on the id and removes the task object from boards storage.
 * @param {string} id Task id
 * @returns {Promise<void>}
 */
const deleteTask = async (id: string): Promise<TaskEntity | null> => {
  const taskRepository = getRepository(TaskEntity);
  const taskToRemove: TaskEntity | undefined = await taskRepository.findOne(id);
  if (!taskToRemove) return null;
  return taskRepository.remove(taskToRemove);
};

module.exports = {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
