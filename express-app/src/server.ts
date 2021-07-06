const { PORT } = require('./common/config');
import app = require('./app');
const connectDB = require('./db.connection');
const createAdminUser = require('./common/create.admin')

const startServer = async (): Promise<void> => {
    try {
        await connectDB();
        console.log('Connected to DB');
    } catch (e) {
        console.error('DB connection error: ', e)
    }
    app.listen(PORT, () =>
        console.log(`App is running on http://localhost:${PORT}`),
    );
    await createAdminUser();
};

startServer();
