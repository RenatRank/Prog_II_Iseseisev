import { users } from "../../mockData";
import { INewUser, IUser } from "./interfaces";

const usersServices= {
    getAllUsers: () => {
        users
    },

    findUserById: (id: number): IUser | undefined => {
        let user: IUser | undefined = users.find(element => element.id === id);
        return user;
    },
    
    addUser: (user:INewUser): number => {
        const id = users.length + 1;
        const newUser: IUser = {
          id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user. password,
        };
        users.push(newUser); 
        return id;
    }
};

export default usersServices;