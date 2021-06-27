import e = require("express");
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY: string = require('../common/config').toString();

// @ts-ignore
const validateSession = (req: e.Request, res: e.Response, next: e.NextFunction): e.Response | e.NextFunction => {
    try {
        // @ts-ignore
        const token: string | undefined = req.headers.authorization.split(' ')[1].toString();
        // @ts-ignore
        jwt.verify(token, JWT_SECRET_KEY, async (err, decoded) => {
            if (decoded) {
                next();
            }
            if (err) return res.status(401).json({ error: `Not authorized: ${err}` });
        });
    } catch (e) {
        return res.status(401).json({ error: `Not authorized: ${e}` });
    }
};

export = validateSession;
