const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
import ITask = require('./task.interface');

router.route('/').get(async (_req, res) => {
  const tasks: Array<ITask> = await tasksService.getAll();
  res.status(200).json(tasks);
});

router.route('/:taskId').get(async (req, res) => {
  const task: ITask | undefined = await tasksService.getTask(req.params.taskId);
  if (task) res.status(200).json(task);
  else res.status(404).json({ status: 'Task not found' });
});

router.route('/').post(async (req, res) => {
  const { boardId }: { boardId : string } = req.params;
  const task: ITask | undefined = await tasksService.createTask(
    req.body,
    boardId,
  );
  res.status(201).json(task);
});

router.route('/:taskId').put(async (req, res) => {
  const newTaskData: ITask = req.body;
  const updatedTask: ITask | undefined = await tasksService.updateTask(newTaskData, req.params.taskId);
  res.status(200).json(updatedTask);
});

router.route('/:taskId').delete(async (req, res) => {
  const taskToDelete: ITask | undefined = await tasksService.getTask(req.params.taskId);
  if (taskToDelete) {
    await tasksService.deleteTask(req.params.taskId);
    res.status(200).json({ status: 'Task was successfully deleted!' });
  } else {
    res.status(404).json({ status: 'Not Found' });
  }
});

module.exports = router;
