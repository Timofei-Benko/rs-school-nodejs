const boardsRepo = require('./board.memory.repository');
import IBoard = require('./board.iterface');

const getAll = async (): Promise<Function> => boardsRepo.getAll();
const getBoard = async (id: string): Promise<Function> => boardsRepo.getBoard(id);
const createBoard = async (boardData: IBoard): Promise<Function> => boardsRepo.createBoard(boardData);
const updateBoard = async (id: string, newBoardData: IBoard): Promise<Function> => boardsRepo.updateBoard(id, newBoardData);
const removeBoard = async (id: string): Promise<Function> => boardsRepo.removeBoard(id);

module.exports = {
  getAll,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard
};