import express, { Express } from 'express';
import generalController from './components/general/controllers';
import usersRoutes from './components/users/routes';
import subjectsRoutes from './components/subjects/routes';
import roomsRoutes from './components/rooms/routes';
import coursesRoutes from './components/courses/routes';
import logger from './components/general/middlewares';
import authController from './components/auth/controllers';
import authMiddlewares from './components/auth/middleware';

const app: Express = express();
const PORT: number = 3000;
app.use(express.json());
const apiPath = '/api/v1'

app.use(logger);
app.post(`${apiPath}/login`, authController.login);
app.get(`${apiPath}/health`, logger, generalController.health);
app.use (authMiddlewares.isLoggedIn);
app.use(`${apiPath}/users`, usersRoutes);
app.use(`${apiPath}/courses`, coursesRoutes);
app.use(`${apiPath}/rooms`, roomsRoutes);
app.use(`${apiPath}/subjects`, subjectsRoutes);

export default app;