const router = require('express').Router();
const boardsService = require('./board.service');
import IBoard = require('./board.iterface');

router.route('/').get(async (_req, res, next) => {
  try {
    const boards: Array<IBoard> = await boardsService.getAll();
    res.status(200).json(boards);
  } catch (err) {
    next(err);
  }
});

router.route('/:boardId').get(async (req, res, next) => {
  try {
    const { boardId }: { boardId: string } = req.params;
    const board: IBoard | undefined = await boardsService.getBoard(boardId);
    if (!board) {
      res.status(404).json({ status: 'Not found' });
    } else {
      res.status(200).json(board);
    }
  } catch (err) {
    next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const board: IBoard = await boardsService.createBoard(req.body);
    res.status(201).json(board);
  } catch (err) {
    next(err);
  }
});

router.route('/:boardId').put(async (req, res, next) => {
  try {
    const { boardId }: { boardId: string } = req.params;
    const newBoardData: IBoard = req.body;
    const updatedBoard: IBoard = await boardsService.updateBoard(boardId, newBoardData);
    res.status(200).json(updatedBoard);
  } catch (err) {
    next(err);
  }
});

router.route('/:boardId').delete(async (req, res, next) => {
  try {
    const { boardId }: { boardId: string } = req.params;
    const board: IBoard | undefined = await boardsService.getBoard(boardId);
    if (!board) {
      res.status(404).json({ status: 'Not found' });
    } else {
      await boardsService.removeBoard(boardId);
      res.status(200).json({ status: 'Board deleted succesfully!' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
