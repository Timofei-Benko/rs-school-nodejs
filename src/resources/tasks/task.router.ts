const router = require('express').Router({ mergeParams: true });
import e = require('express');
const tasksService = require('./task.service');
import ITask = require('./task.interface');

router.route('/').get(async (_req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const tasks: Array<ITask> = await tasksService.getAll();
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
});

router.route('/:taskId').get(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const task: ITask | undefined = await tasksService.getTask(req.params['taskId']);
    if (task) res.status(200).json(task);
    else res.status(404).json({ status: 'Task not found' });
  } catch (err) {
    next(err);
  }
});

router.route('/').post(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const { boardId } = req.params;
    const task: ITask | undefined = await tasksService.createTask(
        req.body,
        boardId
    );
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

router.route('/:taskId').put(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const newTaskData: ITask = req.body;
    const updatedTask: ITask | undefined = await tasksService.updateTask(newTaskData, req.params['taskId']);
    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
});

router.route('/:taskId').delete(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const taskToDelete: ITask | undefined = await tasksService.getTask(req.params['taskId']);
    if (taskToDelete) {
      await tasksService.deleteTask(req.params['taskId']);
      res.status(200).json({ status: 'Task was successfully deleted!' });
    } else {
      res.status(404).json({ status: 'Not Found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
