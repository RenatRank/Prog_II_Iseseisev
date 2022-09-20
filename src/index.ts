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
}

interface IUser extends INewUser {
    id: number,
}

const users: IUser[] = [{
    id: 1,
    firstName: "Juhan",
    lastName: "Juurikas",
    email: "juhan@juurikas.ee",
    password: "juhan",
  },
];

app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Healthy',
  });
});

app.get('/api/v1/users', (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "List of users:",
      users,
    });
  });

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
      users,
    });
  });

  app.delete('/api/v1/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(element => element.id === id);
      if (!index) {
        return res.status (404).json({
          success: false,
          message: "user not found",
        })
      } 
    users.splice(index,1);
    return res.status(200).json({
      success: true,
      message: "User deleted",
    });
  });



app.listen(PORT, () => {

  console.log(`App is running on port ${PORT}`);
});


/* 
1) kasutajad
2) kursused
3) õppejõud
4) ruum
*/
