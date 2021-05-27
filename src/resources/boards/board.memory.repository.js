const Board = require('./board.model');

const boards = [];

const { deleteAllTasks } = require('../tasks/task.service');

const getAll = async () => boards;

const getBoard = async (id) => boards.find(board => board.id === id);

const createBoard = async (boardData) => {
  const newBoard = new Board(boardData);
  boards.push(newBoard);
  return newBoard;
};

const updateBoard = async (id, newBoardData) => {
  const boardToUpdate = await getBoard(id);
  const updatedBoard = new Board({...boardToUpdate, ...newBoardData });
  Object.assign(boardToUpdate, newBoardData);
  return updatedBoard;
};

const removeBoard = async (boardId) => {
  const boardIndex = boards.findIndex(board => board.id === boardId);
  await deleteAllTasks(boardId);
  boards.splice(boardIndex, 1);
};

module.exports = (
  {
    getAll,
    getBoard,
    createBoard,
    updateBoard,
    removeBoard,
  }
);