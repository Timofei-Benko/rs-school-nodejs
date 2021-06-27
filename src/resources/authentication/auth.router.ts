const router = require('express').Router();
import e = require('express');
const bcrypt = require('bcrypt');
import UserEntity = require('../users/user.entity');
const authService = require('./auth.service');
const userService = require('../users/user.service');

// @ts-ignore
router.route('/').post(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
    const { login, password } = req.body;
    try {
        const user: UserEntity = await userService.getUserByFilter({ login });
        if (!user) return res.status(403).json({ error: 'User not found' });

        // @ts-ignore
        bcrypt.compare(password, user.password, (err, matches) => {
            if (err) return res.status(500).json({ error: 'Authentication failed' });
            if (matches) {
                const token = authService.createToken(user.id, user.login);
                return res.status(200).json({ token });
            }
        });
    } catch (e) {
        next(e);
    }
});

module.exports = router;
