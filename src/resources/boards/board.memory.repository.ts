const { getRepository } = require('typeorm');
import BoardEntity = require('./board.entity');
const taskService = require('../tasks/task.service');

const getAll = async (): Promise<Array<BoardEntity| undefined>> => {
    const boardRepository = getRepository(BoardEntity);
    return boardRepository.find();
};

const getBoard = async (id: string): Promise<BoardEntity | undefined> => {
    const boardRepository = getRepository(BoardEntity);
    return boardRepository.findOne(id);
};

const createBoard = async (boardData): Promise<BoardEntity| undefined> => {
    const boardRepository = getRepository(BoardEntity);
    return boardRepository.save(boardData);
};

const updateBoard = async (id: string, newBoardData: BoardEntity): Promise<BoardEntity | null> => {
    const boardRepository = getRepository(BoardEntity);
    const boardToUpdate: BoardEntity | undefined = await boardRepository.findOne(id);
    if (!boardToUpdate) return null;
    return boardRepository.save({...boardToUpdate, ...newBoardData});
};

const removeBoard = async (boardId: string): Promise<BoardEntity | null> => {
    const boardRepository = getRepository(BoardEntity);
    const boardToRemove: BoardEntity | undefined = await boardRepository.findOne(boardId);
    if (!boardToRemove) return null;
    await taskService.deleteTasksByBoardId(boardId);
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