const Task = require('./task.model');

const tasks = [new Task()];

const getAll = (boardId) => tasks.filter(task => task.boardId === boardId);

const getTask = (taskId) => tasks.find(task => task.id === taskId);

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

const deleteAll = async (boardId) => tasks.forEach(task => {
  if (task.boardId === boardId) tasks.splice(tasks.indexOf(task), 1);
});

const unassignUser = async (userId) => {
  tasks.forEach(task => {
    if (task.userId === userId) {
      tasks.splice(tasks.indexOf(task), 1, {...task, userId: null});
    }
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
