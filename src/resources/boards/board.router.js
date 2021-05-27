const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(200).json(boards);
});

router.route('/:boardId').get(async (req, res) => {
  const { boardId } = req.params;
  const board = await boardsService.getBoard(boardId);
  if (!board) {
    res.status(404).json({ status: 'Not found' });
  } else {
    res.status(200).json(board);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.createBoard(req.body);
  res.status(201).json(board);
});

router.route('/:boardId').put(async (req, res) => {
  const { boardId } = req.params;
  const boardUpdateDto = req.body;
  const updatedBoard = await boardsService.updateBoard(boardId, boardUpdateDto);
  res.status(200).json(updatedBoard);
});

router.route('/:boardId').delete(async (req, res) => {
  const { boardId } = req.params;
  const board = await boardsService.getBoard(boardId);
  if (!board) {
    res.status(404).json({ status: 'Not found' });
  } else {
    await boardsService.removeBoard(boardId);
    res.status(200).json({ status: 'Board deleted succesfully!' });
  }
});

module.exports = router;
