const {v4: uuid} = require('uuid');

class User {
  constructor({
    id = uuid(),
    name = 'TEST_USER',
    login = 'TEST_LOGIN',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static fromRequest(user) {
    const { name, login, password } = user;
    return { id: uuid(), name, login, password };
  }
}

module.exports = User;
