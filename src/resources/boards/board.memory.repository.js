const Board = require('./board.model');

const boards = [];

const { deleteAllTasks } = require('../tasks/task.service');

/**
 * Returns all boards from the boards storage in an array as a promise.
 * @returns {Promise<*[]>}
 */
const getAll = async () => boards;

/**
 * Finds a board object based on the given id and returns it as a promise.
 * @param {string} id
 * @returns {Promise<*{}>}
 */
const getBoard = async (id) => boards.find(board => board.id === id);

/**
 * Creates new board object based on the provided object and pushes it to board storage.
 * Returns new board object as a promise.
 * @param {object} boardData
 * @returns {Promise<*{}>}
 */
const createBoard = async (boardData) => {
  const newBoard = new Board(boardData);
  boards.push(newBoard);
  return newBoard;
};

/**
 * Finds board object based on the id and updates it in the boards storage based on the provided object.
 * Returns updated board object as a promise.
 * @param {string} id
 * @param {object} newBoardData
 * @returns {Promise<*{}>}
 */
const updateBoard = async (id, newBoardData) => {
  const boardToUpdate = await getBoard(id);
  const updatedBoard = new Board({...boardToUpdate, ...newBoardData });
  Object.assign(boardToUpdate, newBoardData);
  return updatedBoard;
};

/**
 * Finds board object based on the id, deletes all of its tasks
 * and removes the board object from boards storage.
 * @param {string} boardId
 * @returns {Promise<void>}
 */
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