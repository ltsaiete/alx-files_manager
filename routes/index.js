import express, { Router } from 'express';
// import AppController from '../controllers/AppController';
// import UserController from '../controllers/User';

const routes = Router();

routes.use(express.json());

routes.get('/status', (request, response) => {
  return response.status(200).json({ redis: true, db: true });
});
// routes.get('/stats', AppController.getStats);

// routes.post('/users', UserController.postNew);

export default routes;
