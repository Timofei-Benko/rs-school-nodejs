const router = require('express').Router();
const boardsService = require('./board.service');
import IBoard = require('./board.iterface');

router.route('/').get(async (_req, res) => {
  const boards: Array<IBoard> = await boardsService.getAll();
  res.status(200).json(boards);
});

router.route('/:boardId').get(async (req, res) => {
  const { boardId } : { boardId : string } = req.params;
  const board: IBoard | undefined = await boardsService.getBoard(boardId);
  if (!board) {
    res.status(404).json({ status: 'Not found' });
  } else {
    res.status(200).json(board);
  }
});

router.route('/').post(async (req, res) => {
  const board: IBoard = await boardsService.createBoard(req.body);
  res.status(201).json(board);
});

router.route('/:boardId').put(async (req, res) => {
  const { boardId } : { boardId : string } = req.params;
  const newBoardData: IBoard = req.body;
  const updatedBoard: IBoard = await boardsService.updateBoard(boardId, newBoardData);
  res.status(200).json(updatedBoard);
});

router.route('/:boardId').delete(async (req, res) => {
  const { boardId } : { boardId : string } = req.params;
  const board: IBoard | undefined = await boardsService.getBoard(boardId);
  if (!board) {
    res.status(404).json({ status: 'Not found' });
  } else {
    await boardsService.removeBoard(boardId);
    res.status(200).json({ status: 'Board deleted succesfully!' });
  }
});

module.exports = router;
