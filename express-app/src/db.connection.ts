const { Connection, createConnection } = require('typeorm');
const ormConfig = require('./common/orm.config');

const connectDB = async (): Promise<typeof Connection> => createConnection(ormConfig);

module.exports = connectDB;
