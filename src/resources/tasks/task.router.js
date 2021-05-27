const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  res.status(200).json(tasks);
});

router.route('/:taskId').get(async (req, res) => {
  const task = await tasksService.getTask(req.params.taskId);
  if (task) res.status(200).json(task);
  else res.status(404).json({ status: 'Task not found' });
});

router.route('/').post(async (req, res) => {
  const { boardId } = req.params;
  const task = await tasksService.createTask(
    req.body,
    boardId,
  );
  res.status(201).json(task);
});

router.route('/:taskId').put(async (req, res) => {
  const newTaskData = req.body;
  const updatedTask = await tasksService.updateTask(newTaskData, req.params.taskId);
  res.status(200).json(updatedTask);
});

router.route('/:taskId').delete(async (req, res) => {
  const taskToDelete = await tasksService.getTask(req.params.taskId);
  if (taskToDelete) {
    await tasksService.deleteTask(req.params.taskId);
    res.status(200).json({ status: 'Task was successfully deleted!' });
  } else {
    res.status(404).json({ status: 'Not Found' });
  }
});

module.exports = router;
