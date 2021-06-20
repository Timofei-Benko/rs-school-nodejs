const { ConnectionOptions } = require('typeorm');
const UserEntity = require('../resources/users/user.entity');
const BoardEntity = require('../resources/boards/board.entity');
const TaskEntity = require('../resources/tasks/task.entity');
const ColumnEntity = require('../resources/tasks/column.entity');
const {  POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST } = require('./config');

const config: typeof ConnectionOptions = {
    name: 'default',
    type: 'postgres',
    database: POSTGRES_DB,
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    entities: [ UserEntity, BoardEntity, TaskEntity, ColumnEntity ],
    migrationsRun: true,
    synchronize: false,
    logging: false,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectionInterval: 1000,
    migrations: ['src/migration/*.ts'],
    cli: {
        migrationsDir: 'src/migration',
    },
};

module.exports = config;
