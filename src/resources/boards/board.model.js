const {v4: uuid} = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'TEST_BOARD',
    columns = [
      {
        title: 'TEST_COLUMN',
        order: 0,
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
