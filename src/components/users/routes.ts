import express from 'express';
import usersControllers from './controllers';
import usersMiddlewares from './middlewares';
import authMiddlewares from '../auth/middleware';
const usersRoutes = express.Router();

usersRoutes
    .get('/', usersControllers.getAllUsers)
    .get('/:id', usersControllers.getUserById)
    .post('/', authMiddlewares.isAdmin, usersMiddlewares.checkAddUserData, usersControllers.addUser)
    .patch('/:id', authMiddlewares.isAdmin, usersControllers.updateUser)
    .delete('/:id', authMiddlewares.isAdmin, usersControllers.deleteUser);

export default usersRoutes;