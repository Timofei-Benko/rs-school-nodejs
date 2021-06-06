const fs = require('fs');
const logger = require('morgan');

if (!fs.existsSync('./logs')){
    fs.mkdirSync('./logs');
}

const morganLogger = (): Array<typeof logger> => {
    return [
        logger('dev'),
        logger('common', {
            stream: fs.createWriteStream('./logs/access.log', {flags: 'a+'})
        })
    ];
};

module.exports = {
    morganLogger,
}
