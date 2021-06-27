const { PORT } = require('./common/config');
import app = require('./app');
const connectDB = require('./db.connection');

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
};

startServer();
