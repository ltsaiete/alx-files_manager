import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const routes = Router();

// App status
routes.get('/status', AppController.getStatus);
routes.get('/stats', AppController.getStats);

// Users
routes.post('/users', UsersController.postNew);
routes.get('/users/me', UsersController.getMe);

// Auth
routes.get('/connect', AuthController.getConnect);
routes.get('/disconnect', AuthController.getDisconnect);

export default routes;
