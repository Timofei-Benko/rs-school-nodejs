const {v4: uuid} = require('uuid');
import IUser = require('./user.interfaces')

class User implements IUser {
  id: string;
  name: string;
  login: string;
  password: string;

  constructor({
    id = uuid(),
    name = 'TEST_USER',
    login = 'TEST_LOGIN',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUser) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static fromRequest(user: IUser) {
    const { name, login, password } = user;
    return { id: uuid(), name, login, password };
  }
}

module.exports = User;
