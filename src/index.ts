import express, { Request, Response, Express } from 'express';
import internal from 'stream';
import { INewUser, IUser } from './components/users/interfaces';
import { ICourse, INewCourse } from './components/courses/interfaces';
import { IRoom, INewRoom } from './components/rooms/interfaces';
import { INewSubject, ISubject } from './components/subjects/interfaces';
import { users, courses, rooms, subjects } from './mockData';
import usersControllers from './components/users/controllers';

const app: Express = express();
const PORT: number = 3000;

app.use(express.json());


//Serveritöö endpoint
app.get('/api/v1/health', (req: Request, res: Response) => {
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
app.post('/api/v1/users', usersControllers.addUser);

//Kasutaja kustutamine
app.delete('/api/v1/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(element => element.id === id);
    if (index === -1) {
      return res.status (404).json({
        success: false,
        message: "User not found",
      })
    } 
  users.splice(index, 1);
  return res.status(200).json({
    success: true,
    message: "User deleted",
  });
});

//Kasutaja muutmine
app.patch('/api/v1/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { firstName, lastName, email, password } = req.body;
  const user = users.find(element => element.id === id);
    if (!user) {
      return res.status (404).json({
        success: false,
        message: "User not found",
      });
    }
    if (!firstName && !lastName && !email && !password) {
      return res.status (404).json({
        sucess:false,
        message: 'Nothing to change!',
      });
    }
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) user.password = password;

  return res.status(200).json({
    success: true,
    message: 'User data changed',
  });
});

/*----------------------KURSUS---------------------------- */

// Kursuste nimekiri
app.get('/api/v1/courses', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "List of courses:",
    courses,
  });
});

//Kursuste sisestus:
app.post('/api/v1/courses', (req: Request, res: Response) => {
  const {courseName}= req.body;
  const id = courses.length + 1;
  const newCourse: ICourse = {
    id,
    courseName,
  };
  courses.push(newCourse); 
  res.status(201).json({
    success: true,
    message: `Course with ID ${newCourse.id} created`,
  });
});

//Kursuste kustutamine
app.delete('/api/v1/courses/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = courses.findIndex(element => element.id === id);
    if (index === -1) {
      return res.status (404).json({
        success: false,
        message: "Course not found",
      })
    } 
  courses.splice(index, 1);
  return res.status(200).json({
    success: true,
    message: `Course with ID ${id} deleted`,
  });
});

//Kursuste muutmine
app.patch('/api/v1/courses/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { courseName } = req.body;
  const course = courses.find(element => element.id === id);
    if (!course) {
      return res.status (404).json({
        success: false,
        message: "Course not found",
      });
    }
    if (!courseName) {
      return res.status (404).json({
        sucess:false,
        message: 'Nothing to change!',
      });
    }
    if (courseName) course.courseName = courseName;

  return res.status(200).json({
    success: true,
    message: 'Course data changed',
  });
});

/*----------------------RUUMID---------------------------- */

// Ruumide nimekiri
app.get('/api/v1/rooms', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "List of rooms:",
    rooms,
  });
});

//Ruumide andmete sisestus:
app.post('/api/v1/rooms', (req: Request, res: Response) => {
  const {roomNumber}= req.body;
  const id = rooms.length + 1;
  const newRoom: IRoom = {
    id,
    roomNumber
  };
  rooms.push(newRoom); 
  res.status(201).json({
    success: true,
    message: `Room with ID ${newRoom.id} and with number ${newRoom.roomNumber} created`,
  });
});

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


