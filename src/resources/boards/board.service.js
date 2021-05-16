const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getBoard = (id) => boardsRepo.getBoard(id);
const createBoard = (boardData) => boardsRepo.createBoard(boardData);
const updateBoard = (id, newBoardData) => boardsRepo.updateBoard(id, newBoardData);
const deleteBoard = (id) => boardsRepo.deleteBoard(id);

module.exports = {
  getAll,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
};