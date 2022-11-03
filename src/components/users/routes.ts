import express from 'express';
import usersControllers from './controllers';
import usersMiddlewares from './middlewares';
import authMiddlewares from '../auth/middleware';
const usersRoutes = express.Router();

usersRoutes
    .get('/', authMiddlewares.isAdmin, usersControllers.getAllUsers)
    .get('/:id', usersControllers.getUserById)
    .post('/', usersMiddlewares.checkAddUserData, usersControllers.addUser)
    .patch('/:id', usersControllers.updateUser)
    .delete('/:id', usersControllers.deleteUser);

export default usersRoutes;