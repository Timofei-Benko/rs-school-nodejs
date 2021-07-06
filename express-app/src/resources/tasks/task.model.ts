const { v4: uuid } = require('uuid');
import ITask = require('./task.interface');

class Task implements ITask {
  id: string;
  title: string;
  order: number | null;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;

  constructor({
    id = uuid(),
    title = 'Task',
    order = null,
    description = 'Task number 1',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
