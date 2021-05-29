const Task = require('./task.model');

let tasks = [];

/**
 * Returns all tasks from the tasks storage in an array as a promise.
 * @returns {Promise<object[]>}
 */
const getAll = async () => tasks;

/**
 * Finds a task object based on the given id and returns it as a promise.
 * @param {string} id Task id
 * @returns {Promise<object>}
 */
const getTask = async (id) => tasks.find((task) => task.id === id);

/**
 * Creates new task object based on the provided object, assigns it provided board id
 * and pushes the task object to task storage.
 * Returns new task object as a promise.
 * @param {object} taskData Task data
 * @param {string} boardId Id of the board the task is assigned to
 * @returns {Promise<object>} Created task's data
 */
const createTask = async (taskData, boardId) => {
  const newTask = new Task(taskData);
  newTask.boardId = boardId;
  tasks.push(newTask);
  return newTask;
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
const updateTask = async (newTaskData, id) => {
  const taskToUpdate = await getTask(id);
  const updatedTask = new Task({ ...taskToUpdate, ...newTaskData });
  Object.assign(taskToUpdate, newTaskData);
  return updatedTask;
};

/**
 * Finds task object based on the id and removes the task object from boards storage.
 * @param {string} id Task id
 * @returns {Promise<void>}
 */
const deleteTask = async (id) => {
  const index = tasks.findIndex((task) => task.id === id);
  tasks.splice(index, 1);
};

/**
 * Deletes all tasks that are assigned to a given board based on the board id.
 * @param {string} boardId Id of the board the task is assigned to
 * @returns {Promise<void>}
 */
const deleteAllTasks = async (boardId) => {
  tasks = tasks.filter(task => task.boardId !== boardId);
};

/**
 * Sets userId property to equal null for all tasks that have given user id
 * @param {string} userId Id of the user the task is assigned to
 * @returns {Promise<void>}
 */
const unassignUsers = async (userId) => {
  tasks.forEach(task => {
    if (task.userId === userId) {
      tasks.splice(tasks.indexOf(task), 1, { ...task, userId: null });
    }
  })
};

module.exports = {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  unassignUsers,
};
