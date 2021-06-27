const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const logger = require('./common/logger');
const errorHandler = require('./common/error.handler');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

errorHandler.uncaughtExceptionHandler();
errorHandler.uncaughtRejectionHandler();

app.use(express.json());

logger.morganConsoleLogger(app);
logger.morganFileLogger(app);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: { originalUrl: string; }, res: { send: (arg0: string) => void; }, next: () => void) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

// app.use(errorHandler.routeErrorHandler);

export = app;
