import { Router } from 'express';

import User from 'services/server/models/User';

const UserRouter = Router();

// top-level user router api
UserRouter.use((req, res, next) => {
    next();
});

UserRouter.get('/me', (req, res) => {
    res.json(req.user);
});

export default UserRouter;
