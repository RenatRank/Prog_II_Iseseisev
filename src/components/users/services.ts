import { users } from "../../mockData";
import authServices from "../auth/services";
import { INewUser, IUser, IUserWithoutPassword, IUserWithouRole } from "./interfaces";
import pool from "../../database";

const usersServices= {

    getUserWithoutPassword: (user: IUser): IUserWithoutPassword => {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        };
    },
    
    getAllUsers: async () => {

        const [users] = await pool.query("SELECT * FROM API_users;");
        return users;
        //00:41
    },

    findUserByEmail: (email:string): IUser | undefined => {
        const user: IUser | undefined = users.find(element => element.email === email);
        return user;
    },

    findUserById: (id: number): IUser | undefined => {
        const user: IUser | undefined = users.find(element => element.id === id);
        return user;
    },
    
    addUser: async (user:INewUser): Promise<number> => {
        const id = users.length + 1;
        const hashedPassword = await authServices.hash(user.password);
        const newUser: IUser = {
            id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hashedPassword,
            role: "User"
        };
        users.push(newUser); 
        return id;
    },

    deleteUser: (id: number): Boolean => {
        const index = users.findIndex(element => element.id === id);
        if(index === -1) return false;
        users.splice(index, 1);
        return true;
    },

    updateUser: (userToUpdate: IUserWithouRole ): Boolean => {
        const { id, firstName, lastName, email, password } = userToUpdate;
        const user = usersServices.findUserById(id);
        
        if (user && firstName) user.firstName = firstName;
        if (user && lastName) user.lastName = lastName;
        if (user && email) user.email = email;
        if (user && password) user.password = password;

        return true;
    }
};


export default usersServices;