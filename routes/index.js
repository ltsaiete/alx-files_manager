import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/auth';
import FilesController from '../controllers/FilesController';

const routes = Router();

// App status
routes.get('/status', AppController.getStatus);
routes.get('/stats', AppController.getStats);

// Users
routes.post('/users', UsersController.postNew);

// // Auth
routes.get('/connect', AuthController.getConnect);

// // Authenticated routes
routes.use(authMiddleware);

// // Users
routes.get('/users/me', UsersController.getMe);

// // Auth
routes.get('/disconnect', AuthController.getDisconnect);

// // Files
routes.post('/files', FilesController.postUpload);
routes.get('/files', FilesController.getIndex);
routes.get('/files/:id', FilesController.getShow);
routes.put('/files/:id/publish', FilesController.putPublish);
routes.put('/files/:id/unpublish', FilesController.putUnpublish);

export default routes;
