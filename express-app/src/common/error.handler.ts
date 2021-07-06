import fs = require('fs');
import e = require('express')

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
    createLogsDirectory();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    process.on('uncaughtException', (error: Error, origin) => {

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

        const time: string = getStartTime();
        const errorLog: string =
            `[${time}] - Uncaught rejection: ${reason.message}` + '\n';

        console.error(errorLog);
        fs.writeFileSync('./logs/error.log', errorLog, {flag: 'a+'});
        process.exit(1)
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routeErrorHandler = (err: Error, _req: e.Request, res: e.Response, _next: e.NextFunction) => {
    createLogsDirectory();

    res.status(500);
    res.render('error', { error: err });

    const time: string = getStartTime();
    const errorLog: string =
        `[${time}] - Uncaught rejection: ${err}` + '\n';

    console.error(errorLog);
    fs.writeFileSync('./logs/error.log', errorLog, {flag: 'a+'});
    process.exit(1)
}

module.exports = {
    uncaughtExceptionHandler,
    uncaughtRejectionHandler,
    routeErrorHandler,
}
