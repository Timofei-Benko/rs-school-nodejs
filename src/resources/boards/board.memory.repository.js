const Board = require('./board.model');

const boards = [];

const getAll = async () => boards;

const getBoard = async (id) => boards.find(board => board.id === id);

const createBoard = async (board) => {
  const newBoard = new Board(board)
  boards.push(newBoard);
  return newBoard;
};

const updateBoard = async (id, newBoardData) => {
  const boardIndex = boards.findIndex(board => board.id === id);
  const newBoard = {...newBoardData, id};
  boards.splice(boardIndex, 1, newBoard);
  return newBoard;
};

const deleteBoard = async (id) => {
  const boardToDelete = boards.findIndex(board => board.id === id);
  boards.splice(boardToDelete, 1);
  return {}
};

module.exports = {
  getAll,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
};
