const fs = require('fs');
const morganBody = require('morgan-body');

const morganConsoleLogger = (app): void => {
    morganBody(app);
}

if (!fs.existsSync('./logs')) fs.mkdirSync('./logs');
const stream: NodeJS.WriteStream = fs.createWriteStream('./logs/access.log', {flags: 'a+'});

const morganFileLogger = (app): void => {
    morganBody(app, {
        stream: stream,
        noColors: true,
    });
};

module.exports = {
    morganConsoleLogger,
    morganFileLogger,
}
