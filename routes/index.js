import { Router } from 'express';
import AppController from '../controllers/App';

const routes = Router();

routes.get('/status', AppController.getStatus);
routes.get('/stats', AppController.getStats);

export default routes;
