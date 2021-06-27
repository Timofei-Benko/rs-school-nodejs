const { v4: uuid } = require('uuid');
import IBoard = require('./board.iterface');

class Board implements IBoard{
  id: string;
  title: string;
  columns: Array<{
    id: string;
    title: string;
    order: number;
  }>;

  constructor({
    id = uuid(),
    title = 'BOARD',
    columns = [],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;