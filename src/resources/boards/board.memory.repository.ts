const { getRepository } = require('typeorm');
import BoardEntity = require('./board.entity');

// const boards: Array<IBoard> = [];
//
// const { deleteAllTasks } = require('../tasks/task.service');

/**
 * Returns all boards from the boards storage in an array as a promise.
 * @returns {Promise<object[]>} Array of board objects
 */
const getAll = async (): Promise<Array<BoardEntity| undefined>> => {
    const boardRepository = getRepository(BoardEntity);
    return boardRepository.find();
};

/**
 * Finds a board object based on the given id and returns it as a promise.
 * @param {string} id Board id
 * @returns {Promise<object>} Found board's data
 */
const getBoard = async (id: string): Promise<BoardEntity | undefined> => {
    const boardRepository = getRepository(BoardEntity);
    return boardRepository.findOne(id);
};

/**
 * Creates new board object based on the provided object and pushes it to board storage.
 * Returns new board object as a promise.
 * @param {object} boardData Board data
 * @returns {Promise<object>} Created board's data
 */
const createBoard = async (boardData): Promise<BoardEntity| undefined> => {
    const boardRepository = getRepository(BoardEntity);
    return boardRepository.save(boardData);
};

/**
 * Finds board object based on the id and updates it in the boards storage based on the provided object.
 * Returns updated board object as a promise.
 * @param {string} id Board id
 * @param {object} newBoardData Board data to update
 * @returns {Promise<object>} Updated board's data
 */
const updateBoard = async (id: string, newBoardData: BoardEntity): Promise<BoardEntity | null> => {
    const boardRepository = getRepository(BoardEntity);
    const boardToUpdate: BoardEntity | undefined = await boardRepository.findOne(id);
    if (!boardToUpdate) return null;
    return boardRepository.save({...boardToUpdate, ...newBoardData});
};

/**
 * Finds board object based on the id, deletes all of its tasks
 * and removes the board object from boards storage.
 * @param {string} boardId Board id
 * @returns {Promise<void>}
 */
const removeBoard = async (boardId: string): Promise<BoardEntity | null> => {
    const boardRepository = getRepository(BoardEntity);
    const boardToRemove: BoardEntity | undefined = await boardRepository.findOne(boardId);
    if (!boardToRemove) return null;
    return boardRepository.remove(boardToRemove);
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