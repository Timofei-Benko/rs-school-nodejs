const JWT = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const createToken = (userId: string, login: string): string => {
    return JWT.sign(
        {
            login: login,
            id: userId
        },
        JWT_SECRET_KEY,
        {
            expiresIn: '1h',
        }
    );
};

module.exports = {
    createToken
};
