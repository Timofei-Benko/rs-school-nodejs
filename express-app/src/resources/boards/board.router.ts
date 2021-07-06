const router = require('express').Router();
import e = require('express');
const boardsService = require('./board.service');
import BoardEntity = require('./board.entity');

router.route('/').get(async (_req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const boards: Array<BoardEntity> = await boardsService.getAll();
    res.status(200).json(boards);
  } catch (err) {
    next(err);
  }
});

router.route('/:boardId').get(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const { boardId } = req.params;
    const board: typeof BoardEntity | undefined = await boardsService.getBoard(boardId);
    if (!board) {
      res.status(404).json({ status: 'Not found' });
    } else {
      res.status(200).json(board);
    }
  } catch (err) {
    next(err);
  }
});

router.route('/').post(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const board: typeof BoardEntity = await boardsService.createBoard(req.body);
    res.status(201).json(board);
  } catch (err) {
    next(err);
  }
});

router.route('/:boardId').put(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const { boardId } = req.params;
    const newBoardData: typeof BoardEntity = req.body;
    const updatedBoard: typeof BoardEntity = await boardsService.updateBoard(boardId, newBoardData);
    res.status(200).json(updatedBoard);
  } catch (err) {
    next(err);
  }
});

router.route('/:boardId').delete(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const { boardId } = req.params;
    const board: typeof BoardEntity| undefined = await boardsService.getBoard(boardId);
    if (!board) {
      res.status(404).json({ status: 'Not found' });
    } else {
      await boardsService.removeBoard(boardId);
      res.status(200).json({ status: 'Board deleted successfully!' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
