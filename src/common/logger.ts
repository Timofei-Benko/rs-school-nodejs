const fs = require('fs');
const logger = require('morgan');

const morganLogger = (): Array<typeof logger> => {

    if (!fs.existsSync('./logs')) fs.mkdirSync('./logs');

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
