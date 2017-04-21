import { Router } from 'express';

import {
    SOCIAL_IDS,
    MONGO_URI,
} from 'services/constants';
import User from 'services/server/models/User';
import UserRouter from 'services/server/UserRouter';
import Promise from 'bluebird';
import session from 'express-session';
import mongoose from 'mongoose';

Promise.promisifyAll(mongoose);

console.log(`connecting to: ${MONGO_URI}`);

// connect mongoose
mongoose.connect(MONGO_URI);

// db object
const db = mongoose.connection;

// mongoose error handling
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    // we're connected!
});

const ApiRouter = Router();

// top-level api json.api Content-Type
ApiRouter.use((req, res, next) => {
    res
        .set('Access-Control-Allow-Origin', '*')
        .set('Content-Type', 'application/vnd.api+json');
    next();
});

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
ApiRouter.use(require('morgan')('combined'));
ApiRouter.use(require('cookie-parser')());
ApiRouter.use(require('body-parser').urlencoded({
    extended: true
}));
ApiRouter.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// user resource endpoints
ApiRouter.use('/users', UserRouter);

export default ApiRouter;
