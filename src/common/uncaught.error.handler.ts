import fs = require('fs');

const createLogsDirectory = () => {
    if (!fs.existsSync('./logs')) fs.mkdirSync('./logs');
};

const getStartTime = (): string => {
    const date: Date = new Date();

    return date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
}

const uncaughtExceptionHandler = (): void => {
    process.on('uncaughtException', (error, origin) => {
        createLogsDirectory();

        const time: string = getStartTime();
        const errorLog: string = `[${time}] - Uncaught Exception: ${error.message} - origin: ${origin}` + '\n';

        console.error(errorLog);
        fs.writeFileSync('./logs/error.log', errorLog, {flag: 'a+'});
        process.exit(1);
    });
};

function uncaughtRejectionHandler() {
    createLogsDirectory();

    process.on('unhandledRejection', (reason: Error) => {
        if (!fs.existsSync('./logs')) fs.mkdirSync('./logs');

        const time: string = getStartTime();
        const errorLog: string =
            `[${time}] - Uncaught rejection: ${reason.message}` + '\n';

        console.error(errorLog);
        fs.writeFileSync('./logs/error.log', errorLog, {flag: 'a+'});
        process.exit(1)
    })
}

module.exports = {
    uncaughtExceptionHandler,
    uncaughtRejectionHandler,
}
