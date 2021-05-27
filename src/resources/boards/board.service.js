const boardsRepo = require('./board.memory.repository');

const getAll = async () => boardsRepo.getAll();
const getBoard = async (id) => boardsRepo.getBoard(id);
const createBoard = async (boardData) => boardsRepo.createBoard(boardData);
const updateBoard = async (id, newBoardData) => boardsRepo.updateBoard(id, newBoardData);
const deleteBoard = async (id) => boardsRepo.deleteBoard(id);

module.exports = {
  getAll,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
};