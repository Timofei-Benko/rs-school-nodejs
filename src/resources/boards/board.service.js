const boardsRepo = require('./board.memory.repository');

const getAll = async () => boardsRepo.getAll();
const getBoard = async (id) => boardsRepo.getBoard(id);
const createBoard = async (boardDto) => boardsRepo.createBoard(boardDto);
const updateBoard = async (id, boardUpdateDto) => boardsRepo.updateBoard(id, boardUpdateDto);
const removeBoard = async (id) => boardsRepo.removeBoard(id);

module.exports = {
  getAll,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard
};