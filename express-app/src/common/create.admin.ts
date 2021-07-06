const userService = require('../resources/users/user.service');

const createAdmin = async (): Promise<void> => {
    const admin = await userService.getUserByFilter({ login: 'admin' });
    if (!admin) {
        const user = await userService.createUser({ name: 'admin', login: 'admin', password: 'admin' });
        console.log('Addmin user created', user);
    }
};

module.exports = createAdmin;
