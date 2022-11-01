import express, { Request, Response, Express, NextFunction } from 'express';
import internal from 'stream';
import { INewUser, IUser } from './components/users/interfaces';
import { ICourse, INewCourse } from './components/courses/interfaces';
import { IRoom, INewRoom } from './components/rooms/interfaces';
import { INewSubject, ISubject } from './components/subjects/interfaces';
import { users, courses, rooms, subjects } from './mockData';
import usersControllers from './components/users/controllers';
import usersMiddlewares from './components/users/middlewares';
import coursesControllers from './components/courses/controllers';
import roomsControllers from './components/rooms/controllers';

const app: Express = express();
const PORT: number = 3000;

app.use(express.json());

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
  next();
};

app.use(logger);

//Serveritöö endpoint
app.get('/api/v1/health', logger, (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Healthyrfgdfgdf',
  });
});


// Kasutajate nimekiri
app.get('/api/v1/users', usersControllers.getAllUsers);

//Kasutaja id alusel
app.get('/api/v1/users/:id', usersControllers.getUserById);

//Kasutaja loomine
app.post('/api/v1/users', usersMiddlewares.checkAddUserData, usersControllers.addUser);

//Kasutaja kustutamine
app.delete('/api/v1/users/:id', usersControllers.deleteUser);

//Kasutaja muutmine
app.patch('/api/v1/users/:id', usersControllers.updateUser);

/*----------------------KURSUS---------------------------- */

// Kursuste nimekiri
app.get('/api/v1/courses', coursesControllers.getAllCourses);

//Kursuste sisestus:
app.post('/api/v1/courses', coursesControllers.addCourse);

//Kursuste kustutamine
app.delete('/api/v1/courses/:id', coursesControllers.deleteCourse);

//Kursuste muutmine
app.patch('/api/v1/courses/:id', coursesControllers.updateCourse);

/*----------------------RUUMID---------------------------- */

// Ruumide nimekiri
app.get('/api/v1/rooms', roomsControllers.getAllRooms);

//Ruumide andmete sisestus:
app.post('/api/v1/rooms', roomsControllers.addRooms);

//Ruumi kustutamine
app.delete('/api/v1/rooms/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = rooms.findIndex(element => element.id === id);
    if (index === -1) {
      return res.status (404).json({
        success: false,
        message: "Room not found",
      })
    } 
  rooms.splice(index, 1);
  return res.status(200).json({
    success: true,
    message: `Room with ID ${id} deleted`,
  });
});

//Ruumi andmete muutmine
app.patch('/api/v1/rooms/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { roomNumber} = req.body;
  const room = rooms.find(element => element.id === id);
    if (!room) {
      return res.status (404).json({
        success: false,
        message: "Room not found",
      });
    }
    if (!roomNumber) {
      return res.status (404).json({
        sucess: false,
        message: 'Nothing to change!',
      });
    }
    if (roomNumber) room.roomNumber = roomNumber;

  return res.status(200).json({
    success: true,
    message: 'Room data changed',
  });
});

/*----------------------ÕPPEAINE---------------------------- */


// Õppeainete nimekiri
app.get('/api/v1/subjects', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "List of subjects:",
    subjects,
  });
});

//Õppeaine sisestus:
app.post('/api/v1/subjects', (req: Request, res: Response) => {
  const {subjectName}= req.body;
  const id = subjects.length + 1;
  const newSubject: ISubject = {
    id,
    subjectName,
  };
  subjects.push(newSubject); 
  res.status(201).json({
    success: true,
    message: `Subject with ID ${newSubject.id} created`,
  });
});

//Õppeaine kustutamine
app.delete('/api/v1/subjects/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = subjects.findIndex(element => element.id === id);
    if (index === -1) {
      return res.status (404).json({
        success: false,
        message: "Subject not found",
      })
    } 
  subjects.splice(index, 1);
  return res.status(200).json({
    success: true,
    message: `Subject with ID ${id} deleted`,
  });
});

//Õppeaine muutmine
app.patch('/api/v1/subjects/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { subjectName } = req.body;
  const subject = subjects.find(element => element.id === id);
    if (!subject) {
      return res.status (404).json({
        success: false,
        message: "Subject not found",
      });
    }
    if (!subjectName) {
      return res.status (404).json({
        sucess:false,
        message: 'Nothing to change!',
      });
    }
    if (subjectName) subject.subjectName = subjectName;

  return res.status(200).json({
    success: true,
    message: 'Subject data changed',
  });
});


app.listen(PORT, () => {

  console.log(`App is running on port ${PORT}`);
});


