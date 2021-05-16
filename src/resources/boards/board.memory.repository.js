const Board = require('./board.model');

const boards = [new Board()];

const getAll = () => boards;

const getBoard = (id) => boards.find(board => board.id === id);

const createBoard = async (board) => {
  boards.push(new Board(board));
  return board;
};

const updateBoard = async (id, newBoardData) => {
  const boardIndex = boards.findIndex(board => board.id === id);
  const newBoard = {...newBoardData, id};
  boards.splice(boardIndex, 1, newBoard);
  return newBoard;
};

const deleteBoard = async (id) => {
  const boardToDelete = boards.find(board => board.id === id);
  boards.splice(boards.indexOf(boardToDelete), 1);
  return boardToDelete;
};

module.exports = {
  getAll,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
};
