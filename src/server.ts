const { PORT } = require('./common/config');
const appToRun = require('./app');

appToRun.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
