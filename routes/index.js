import express, { Router } from 'express';
import AppController from '../controllers/App';
import UserController from '../controllers/User';

const routes = Router();

routes.use(express.json());

routes.get('/status', AppController.getStatus);
routes.get('/stats', AppController.getStats);

routes.post('/users', UserController.postNew);

export default routes;
