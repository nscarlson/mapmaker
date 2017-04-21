import express from 'express';

import router from 'services/server/router';
import ApiRouter from 'services/server/ApiRouter';
import { APP_PORT } from 'services/constants';

const app = express();

// API routes
app.use('/api/v1', ApiRouter);

app.use('/dist', express.static('static/dist'));

app.use('/', router);

const init = () => app.listen(APP_PORT, () => {
    console.log('Listening on port', APP_PORT);
});

export { init };
export default app;
