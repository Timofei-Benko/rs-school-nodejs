const router = require('express').Router();
const tasksService = require('./task.service');
const boardsService = require('../boards/board.service');

router.route('/').get(async (req, res) => {
  const board = await boardsService.getBoard(req.params.boardId);
  const tasks = await tasksService.getAll(req.params.boardId);
  if (board && tasks) res.json(tasks);
  else res.status(404);
});

router.route('/:taskId').get(async (req, res) => {
  const task = await tasksService.getTask(req.params.taskId)
  res.status(200).send(task);
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.createTask(req.params.boardId, req.body);
  res.status(201).send(task);
});

router.route('/:taskId').put(async (req, res) => {
  const task = await tasksService.updateTask(
    req.params.taskId,
    req.body
  );
  res.status(200).send(task);
});

router.route('/:taskId').delete(async (req, res) => {
  const task = await tasksService.deleteTask(req.params.taskId);
  res.status(204).send(task);
})

module.exports = router;
