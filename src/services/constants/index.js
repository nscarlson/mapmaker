const __SERVER__ = typeof window === 'undefined';
const __CLIENT__ = !__SERVER__;

const ARCHIVE_INTERVAL = 1000;
const ARCHIVE_TIMEOUT = 900000;
const APP_PORT = 3000;

const NODE_ENV = process.env.NODE_ENV;

const AWS_LIIIST_ID = process.env.AWS_LIIIST_ID;
const AWS_LIIIST_KEY = process.env.AWS_LIIIST_KEY;
const AWS_TAG = process.env.AWS_TAG;

const MONGO_URI = (() => {
    let uri = '';

    switch (NODE_ENV) {
        case 'development':
            uri = process.env.DEV_LIIIST_MONGO_URI;
            break;
        case 'staging':
            uri = process.env.DEV_LIIIST_MONGO_URI;
            break;
        case 'production':
            uri = process.env.PROD_LIIIST_MONGO_URI;
    }

    return (uri);
})();

const DOMAIN = (() => {
    let domain = 'localhost';

    switch (NODE_ENV) {
        case 'development':
            break;
        case 'staging':
            domain = 'dev.liiist.io';
            break;
        case 'production':
            domain = 'liiist.io';
    }

    return (domain);
})();

const SOCIAL_IDS = (() => {
    let callbackURL = 'http://localhost:3000/api/v1/auth/twitter/return';

    switch (NODE_ENV) {
        case 'development':
            callbackURL = `http://localhost:${APP_PORT}/api/v1/auth/twitter/return`;
            break;
        case 'staging':
            callbackURL = 'https://dev.liiist.io/api/v1/auth/twitter/return';
            break;
        case 'production':
            callbackURL = 'https://liiist.io/api/v1/auth/twitter/return';
    }

    return ({
        twitter: {
            // TODO: pull in these values from process.env
            clientID: process.env.CONSUMER_KEY,
            clientSecret: process.env.CONSUMER_SECRET,
            callbackURL: callbackURL
        }
    });
})();

export {
    __CLIENT__,
    __SERVER__,
    ARCHIVE_INTERVAL,
    ARCHIVE_TIMEOUT,
    NODE_ENV,
    AWS_LIIIST_ID,
    AWS_LIIIST_KEY,
    AWS_TAG,
    APP_PORT,
    SOCIAL_IDS,
    DOMAIN,
    MONGO_URI
};
