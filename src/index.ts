import express, { Request, Response, Express, NextFunction } from 'express';
import usersControllers from './components/users/controllers';
import usersMiddlewares from './components/users/middlewares';
import coursesControllers from './components/courses/controllers';
import roomsControllers from './components/rooms/controllers';
import subjectsControllers from './components/subjects/controllers';
import generalController from './components/general/controllers';

const app: Express = express();
const PORT: number = 3000;

app.use(express.json());

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
  next();
};

app.use(logger);

app.get('/api/v1/health', logger, generalController.health);
app.get('/api/v1/users', usersControllers.getAllUsers);
app.get('/api/v1/users/:id', usersControllers.getUserById);
app.post('/api/v1/users', usersMiddlewares.checkAddUserData, usersControllers.addUser);
app.delete('/api/v1/users/:id', usersControllers.deleteUser);
app.patch('/api/v1/users/:id', usersControllers.updateUser);
app.get('/api/v1/courses', coursesControllers.getAllCourses);
app.post('/api/v1/courses', coursesControllers.addCourse);
app.delete('/api/v1/courses/:id', coursesControllers.deleteCourse);
app.patch('/api/v1/courses/:id', coursesControllers.updateCourse);
app.get('/api/v1/rooms', roomsControllers.getAllRooms);
app.post('/api/v1/rooms', roomsControllers.addRooms);
app.delete('/api/v1/rooms/:id', roomsControllers.deleteRooms);
app.patch('/api/v1/rooms/:id', roomsControllers.updateRooms);
app.get('/api/v1/subjects', subjectsControllers.getAllSubjects);
app.post('/api/v1/subjects', subjectsControllers.addSubjects);
app.delete('/api/v1/subjects/:id', subjectsControllers.deleteSubjects);
app.patch('/api/v1/subjects/:id', subjectsControllers.updateSubjects);


app.listen(PORT, () => {

  console.log(`App is running on port ${PORT}`);
});


