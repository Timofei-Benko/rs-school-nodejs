const Task = require('./task.model');

const tasks = [];

const getAll = async () => tasks;

const getTask = async (taskId) => tasks.find(task => task.id === taskId);

const createTask = async (boardId, task) => {
  const newTask = new Task({ ...task, boardId })
  tasks.push(newTask);
  return newTask;
};

const updateTask = async (taskId, newTaskData) => {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  const newTask = {...newTaskData, taskId};
  tasks.splice(taskIndex, 1, newTask);
  return newTask;
};

const deleteTask = async (taskId) => {
  const taskToDelete = tasks.find(task => task.id === taskId);
  tasks.splice(tasks.indexOf(taskToDelete), 1);
  return taskToDelete;
};

const deleteAll = async (boardId) => {
  tasks.forEach(task => {
    if (task.boardId === boardId) tasks.splice(tasks.indexOf(task), 1);
  });
};

const unassignUser = async (userId) => {
  tasks.forEach(task => {
    // eslint-disable-next-line no-param-reassign
    if (task.userId === userId) task.userId = null;
  });
};

module.exports = {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  deleteAll,
  unassignUser,
};
