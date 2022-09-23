import express, { Request, Response, Express } from 'express';
import internal from 'stream';

const app: Express = express();
const PORT: number = 3000;

app.use(express.json());

interface INewUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
};

interface IUser extends INewUser {
    id: number,
};

const users: IUser[] = [{
    id: 1,
    firstName: "Juhan",
    lastName: "Juurikas",
    email: "juhan@juurikas.ee",
    password: "juhan",
  },
];

interface INewCourse{
  courseName: string,
};

interface ICourse extends INewCourse{
   id:number,
};

const courses: ICourse[] = [{
  id: 1,
  courseName: "Rakendusinformaatika"
}];

interface INewTeacher {
  firstName: string,
  lastName: string,
  email: string
};

interface ITeacher extends INewTeacher {
  id: number,
};

const teachers: ITeacher [] = [{
  id: 1,
  firstName: "Mai",
  lastName: "Kuu",
  email: "mai@kuu.ee"
}]

interface INewSubject{
  subjectName: string,
};

interface ISubject extends INewSubject{
   id:number,
};

const subjects: ISubject[] = [{
  id: 1,
  subjectName: "Programmeerimine II"
}];



//Serveritöö endpoint
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Healthyrfgdfgdf',
  });
});


// Kasutajate nimekiri
app.get('/api/v1/users', (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "List of users:",
      users,
    });
  });

//Kasutaja id alusel
app.get('/api/v1/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find(element => element.id === id);
    if (!user) {
      return res.status (404).json({
        success: false,
        message: "User not found",
      })
    } 
  return res.status(200).json({
    success: true,
    message: `User with ID ${user.id} found`,
    data: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }
  });
});

//Kasutaja loomine
app.post('/api/v1/users', (req: Request, res: Response) => {
    const {firstName, lastName, email, password}= req.body;
    const id = users.length + 1;
    const newUser: IUser = {
      id,
      firstName,
      lastName,
      email,
      password,
    };
    users.push(newUser); 
    res.status(201).json({
      success: true,
      message: `User with ID ${newUser.id} created`,
    });
  });

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

/*----------------------ÕPPEJÕUD---------------------------- */

// Õppejõudude nimekiri
app.get('/api/v1/teachers', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "List of teachers:",
    teachers,
  });
});

//Õppejõu andmete sisestus:
app.post('/api/v1/teachers', (req: Request, res: Response) => {
  const {firstName, lastName, email}= req.body;
  const id = teachers.length + 1;
  const newTeacher: ITeacher = {
    id,
    firstName,
    lastName,
    email,
  };
  teachers.push(newTeacher); 
  res.status(201).json({
    success: true,
    message: `Teacher with ID ${newTeacher.id} created`,
  });
});

//Õppejõu kustutamine
app.delete('/api/v1/teachers/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = teachers.findIndex(element => element.id === id);
    if (index === -1) {
      return res.status (404).json({
        success: false,
        message: "Teacher not found",
      })
    } 
  teachers.splice(index, 1);
  return res.status(200).json({
    success: true,
    message: `Teacher with ID ${id} deleted`,
  });
});

//Õppejõu admete muutmine
app.patch('/api/v1/teachers/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { firstName, lastName, email} = req.body;
  const teacher = teachers.find(element => element.id === id);
    if (!teacher) {
      return res.status (404).json({
        success: false,
        message: "Teacher not found",
      });
    }
    if (!firstName && !lastName && !email) {
      return res.status (404).json({
        sucess: false,
        message: 'Nothing to change!',
      });
    }
    if (firstName) teacher.firstName = firstName;
    if (lastName) teacher.lastName = lastName;
    if (email) teacher.email = email;

  return res.status(200).json({
    success: true,
    message: 'Course data changed',
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


