const Task = require('./task.model');

const tasks = [];

const getAll = async () => tasks;

const getTask = async (id) => tasks.find((task) => task.id === id);

const createTask = async (taskData, boardId) => {
  const newTask = new Task(taskData);
  newTask.boardId = boardId;
  tasks.push(newTask);
  return newTask;
};

const updateTask = async (newTaskData, id) => {
  const taskToUpdate = await getTask(id);
  const updatedTask = new Task({ ...taskToUpdate, ...newTaskData });
  Object.assign(taskToUpdate, newTaskData);
  return updatedTask;
};

const deleteTask = async (id) => {
  const index = tasks.findIndex((task) => task.id === id);
  tasks.splice(index, 1);
};

const deleteAllTasks = async (boardId) => {
  for (let i = 0; i < tasks.length; i += 1) {
    const task = tasks[i];
    if (task.boardId === boardId) {
      tasks.splice(i, 1);
      i -= 1;
    }
  }
};

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
