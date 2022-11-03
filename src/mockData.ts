import { ICourse } from "./components/courses/interfaces";
import { IRoom } from "./components/rooms/interfaces";
import { ISubject } from "./components/subjects/interfaces";
import { IUser } from "./components/users/interfaces";

const users: IUser[] = [{
    id: 1,
    firstName: "Juhan",
    lastName: "Juurikas",
    email: "juhan@juurikas.ee",
    password: "$2b$10$mvmmMafihiscDZ/F.QJvWu1BfvVeLzC.SlfaGFSIfxrJcCh9EOe.i",
    role: "Admin"
  },
  {
    id: 2,
    firstName: "Juss",
    lastName: "Juurikas",
    email: "juss@juurikas.ee",
    password: "$2b$10$mvmmMafihiscDZ/F.QJvWu1BfvVeLzC.SlfaGFSIfxrJcCh9EOe.i",
    role: "User"
  },
  ];

  const courses: ICourse[] = [{
    id: 1,
    courseName: "Rakendusinformaatika"
  }];

  const subjects: ISubject[] = [{
    id: 1,
    subjectName: "Programmeerimine II"
  }];

  const rooms: IRoom [] = [{
    id: 1,
    roomNumber: "205"
  }];

  export {users, courses, subjects, rooms};

