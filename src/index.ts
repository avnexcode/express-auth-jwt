import app from './app';
import Logging from './helpers/Logging';

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  Logging.info(`Listening: http://localhost:${port}/api/v1`);
  /* eslint-enable no-console */
});
