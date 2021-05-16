const router = require('express').Router();
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getBoard(req.params.id);
  if (!board) res.status(404);
  else res.status(200).json(board);
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.createBoard(req.body);
  if (!board) res.status(404);
  else res.status(201).json(board);
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.updateBoard(
    req.params.id,
    req.body
  );
  if (!board) res.status(404);
  else res.status(200).json(board);
});

router.route('/:id').delete(async (req, res) => {
  const board = await boardsService.deleteBoard(req.params.id);
  if (!board) res.status(404);
  else {
    await tasksService.deleteAll(req.params.id)
    res.status(204).send('board has been deleted successfully');
  }
})

module.exports = router;